// Minimal browser-side plan generator for Cardity envelopes
// - Returns a result object containing commitTx/revealTxs placeholders and a `plan` field
// - The `plan` field is a FileInscriptionRequest that wallets can consume directly

export type CardityOp = 'deploy' | 'deploy_package' | 'deploy_part' | 'invoke' | 'event';

export interface CardityEnvelopeBase {
  p: 'cardity' | 'cardinals' | 'cpl';
  op: CardityOp;
  // deploy/package/part
  protocol?: string;
  version?: string;
  module?: string;
  carc_b64?: string;
  file_hex?: string;
  package_id?: string;
  bundle_id?: string;
  idx?: number;
  total?: number;
  // invoke/event
  contract_id?: string;
  contract_ref?: string;
  method?: string;
  args?: any;
  // abi (optional, chain-off)
  abi?: any;
  abi_b64?: string;
}

export interface FileInscriptionRequest {
  commitTxPrevOutputList: any[];
  commitFeeRate: number;
  revealFeeRate: number;
  changeAddress: string;
  amountToFeeAddress: number;
  needServiceFee: boolean;
  inscriptionDataList: Array<{
    contentType: string;
    body: string;      // UTF-8 JSON envelope
    file_b64: string;  // for deploy: .carc in base64; invoke/event: ''
    revealAddr: string;
    repeat: number;
  }>;
}

export interface PlanOptions {
  commitFeeRate?: number;   // default 1 (sat/KB)
  revealFeeRate?: number;   // default 1 (sat/KB)
  changeAddress?: string;   // default ''
  amountToFeeAddress?: number; // default 0
  needServiceFee?: boolean; // default false
  repeat?: number;          // default 1
}

export interface GeneratedPlanResult {
  // placeholders to satisfy upstream expectations; real broadcasting should use `plan`
  commitTx: string;         // '' placeholder
  revealTxs: string[];      // [] placeholder
  // actual plan that wallet can consume
  plan: FileInscriptionRequest;
}

function hexToBytes(hex: string): Uint8Array {
  const s = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (s.length % 2 !== 0) throw new Error('file_hex length must be even');
  const out = new Uint8Array(s.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(s.substr(i * 2, 2), 16);
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof window !== 'undefined' && (window as any).btoa) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  // Node fallback (SSR)
  return Buffer.from(bytes).toString('base64');
}

function normalizeInvokeEnvelope(envelope: CardityEnvelopeBase): CardityEnvelopeBase {
  const e = { ...envelope };
  if (!e.p) e.p = 'cardity';
  if (e.op === 'invoke' && e.module && e.method && !e.method.includes('.')) {
    e.method = `${e.module}.${e.method}`;
  }
  return e;
}

function stringifyBody(envelope: CardityEnvelopeBase): string {
  // Basic canonicalization for transport; RFC8785 is overkill here for payload body
  return JSON.stringify(envelope);
}

function buildInscriptionPlan(
  envelope: CardityEnvelopeBase,
  revealAddr: string,
  opts: PlanOptions = {}
): FileInscriptionRequest {
  if (!envelope || !envelope.op) throw new Error('Invalid envelope: missing op');
  if (!revealAddr) throw new Error('Missing revealAddr');

  const {
    commitFeeRate = 1,
    revealFeeRate = 1,
    changeAddress = '',
    amountToFeeAddress = 0,
    needServiceFee = false,
    repeat = 1
  } = opts;

  let contentType = 'application/json';
  let file_b64 = '';

  if (envelope.op === 'deploy' || envelope.op === 'deploy_package' || envelope.op === 'deploy_part') {
    contentType = 'application/cardity-carc';
    if (envelope.carc_b64 && envelope.carc_b64.trim()) {
      file_b64 = envelope.carc_b64.trim();
    } else if (envelope.file_hex && envelope.file_hex.trim()) {
      const bytes = hexToBytes(envelope.file_hex.trim());
      file_b64 = bytesToBase64(bytes);
    } else {
      // allow empty file for minimal demos; indexer will still accept JSON-only deploy, though not recommended
      file_b64 = '';
    }
  } else if (envelope.op === 'invoke' || envelope.op === 'event') {
    contentType = 'application/json';
    file_b64 = '';
    envelope = normalizeInvokeEnvelope(envelope);
  }

  const body = stringifyBody(envelope);

  const plan: FileInscriptionRequest = {
    commitTxPrevOutputList: [],
    commitFeeRate,
    revealFeeRate,
    changeAddress,
    amountToFeeAddress,
    needServiceFee,
    inscriptionDataList: [
      {
        contentType,
        body,
        file_b64,
        revealAddr,
        repeat
      }
    ]
  };

  return plan;
}

export async function generatePlanFromEnvelope(
  envelope: CardityEnvelopeBase,
  revealAddr: string,
  opts?: PlanOptions
): Promise<GeneratedPlanResult> {
  const plan = buildInscriptionPlan(envelope, revealAddr, opts);
  return { commitTx: '', revealTxs: [], plan };
}

export async function generatePlanFromNeedPlanResponse(
  resp: { envelope: CardityEnvelopeBase },
  revealAddr: string,
  opts?: PlanOptions
): Promise<GeneratedPlanResult> {
  if (!resp || !resp.envelope) throw new Error('Not a needPlan response');
  const plan = buildInscriptionPlan(resp.envelope, revealAddr, opts);
  return { commitTx: '', revealTxs: [], plan };
}


