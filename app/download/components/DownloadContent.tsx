"use client"

import Link from 'next/link'
import { ArrowRight, Download, Code, Package, Terminal, Database, Zap, Shield, Github, ExternalLink } from 'lucide-react'
import { useTranslations } from '../../../lib/i18n'
import { useMemo } from 'react'

export default function DownloadContent() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 使用 useMemo 确保下载选项在语言切换时重新计算
  const downloadOptions = useMemo(() => [
    {
      title: t('download.downloadOptions.cliTools.title'),
      description: t('download.downloadOptions.cliTools.description'),
      icon: Terminal,
      downloads: [
        {
          name: t('download.tools.cardity.name'),
          description: t('download.tools.cardity.description'),
          version: t('download.tools.cardity.version'),
          size: t('download.tools.cardity.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.tools.cardityc.name'),
          description: t('download.tools.cardityc.description'),
          version: t('download.tools.cardityc.version'),
          size: t('download.tools.cardityc.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.tools.cardityRuntime.name'),
          description: t('download.tools.cardityRuntime.description'),
          version: t('download.tools.cardityRuntime.version'),
          size: t('download.tools.cardityRuntime.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.tools.cardityDrc20.name'),
          description: t('download.tools.cardityDrc20.description'),
          version: t('download.tools.cardityDrc20.version'),
          size: t('download.tools.cardityDrc20.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.tools.cardityAbi.name'),
          description: t('download.tools.cardityAbi.description'),
          version: t('download.tools.cardityAbi.version'),
          size: t('download.tools.cardityAbi.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.tools.cardityDeploy.name'),
          description: t('download.tools.cardityDeploy.description'),
          version: t('download.tools.cardityDeploy.version'),
          size: t('download.tools.cardityDeploy.size'),
          platform: t('download.platforms.allPlatforms')
        }
      ]
    },
    {
      title: t('download.downloadOptions.exampleProjects.title'),
      description: t('download.downloadOptions.exampleProjects.description'),
      icon: Code,
      downloads: [
        {
          name: t('download.examples.helloWorld.name'),
          description: t('download.examples.helloWorld.description'),
          version: t('download.examples.helloWorld.version'),
          size: t('download.examples.helloWorld.size'),
          platform: t('download.platforms.sourceCode')
        },
        {
          name: t('download.examples.counterProtocol.name'),
          description: t('download.examples.counterProtocol.description'),
          version: t('download.examples.counterProtocol.version'),
          size: t('download.examples.counterProtocol.size'),
          platform: t('download.platforms.sourceCode')
        },
        {
          name: t('download.examples.walletProtocol.name'),
          description: t('download.examples.walletProtocol.description'),
          version: t('download.examples.walletProtocol.version'),
          size: t('download.examples.walletProtocol.size'),
          platform: t('download.platforms.sourceCode')
        },
        {
          name: t('download.examples.drc20Token.name'),
          description: t('download.examples.drc20Token.description'),
          version: t('download.examples.drc20Token.version'),
          size: t('download.examples.drc20Token.size'),
          platform: t('download.platforms.sourceCode')
        },
        {
          name: t('download.examples.eventDemo.name'),
          description: t('download.examples.eventDemo.description'),
          version: t('download.examples.eventDemo.version'),
          size: t('download.examples.eventDemo.size'),
          platform: t('download.platforms.sourceCode')
        },
        {
          name: t('download.examples.votingSystem.name'),
          description: t('download.examples.votingSystem.description'),
          version: t('download.examples.votingSystem.version'),
          size: t('download.examples.votingSystem.size'),
          platform: t('download.platforms.sourceCode')
        }
      ]
    },
    {
      title: t('download.downloadOptions.developmentKit.title'),
      description: t('download.downloadOptions.developmentKit.description'),
      icon: Package,
      downloads: [
        {
          name: t('download.devKit.cardityDevKit.name'),
          description: t('download.devKit.cardityDevKit.description'),
          version: t('download.devKit.cardityDevKit.version'),
          size: t('download.devKit.cardityDevKit.size'),
          platform: t('download.platforms.allPlatforms')
        },
        {
          name: t('download.devKit.vsCodeExtension.name'),
          description: t('download.devKit.vsCodeExtension.description'),
          version: t('download.devKit.vsCodeExtension.version'),
          size: t('download.devKit.vsCodeExtension.size'),
          platform: t('download.platforms.vsCode')
        },
        {
          name: t('download.devKit.projectTemplates.name'),
          description: t('download.devKit.projectTemplates.description'),
          version: t('download.devKit.projectTemplates.version'),
          size: t('download.devKit.projectTemplates.size'),
          platform: t('download.platforms.sourceCode')
        }
      ]
    }
  ], [t])

  const platforms = [
    {
      name: t('download.platforms.macOS'),
      icon: '🍎',
      architectures: [t('download.platforms.architectures.intelX64'), t('download.platforms.architectures.appleSilicon')],
      packageManagers: [t('download.platforms.packageManagers.homebrew'), t('download.platforms.packageManagers.directDownload')]
    },
    {
      name: t('download.platforms.linux'),
      icon: '🐧',
      architectures: [t('download.platforms.architectures.x64'), t('download.platforms.architectures.arm64')],
      packageManagers: [t('download.platforms.packageManagers.apt'), t('download.platforms.packageManagers.yum'), t('download.platforms.packageManagers.directDownload')]
    },
    {
      name: t('download.platforms.windows'),
      icon: '🪟',
      architectures: [t('download.platforms.architectures.x64')],
      packageManagers: [t('download.platforms.packageManagers.chocolatey'), t('download.platforms.packageManagers.directDownload')]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">
          {t('download.title')}
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          {t('download.subtitle')}
        </p>
      </div>

      {/* Quick Start */}
      <div className="mb-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('download.quickStart.title')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('download.quickStart.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {platforms.map(platform => (
              <div key={platform.name} className="bg-gray-800 rounded-lg p-6">
                <div className="text-4xl mb-4">{platform.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {platform.name}
                </h3>
                <div className="text-sm text-gray-400 mb-4">
                  <div className="mb-2">
                    <strong>{t('download.platforms.architecturesLabel')}</strong>
                    <div className="mt-1">
                      {platform.architectures.map(arch => (
                        <span key={arch} className="inline-block bg-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>{t('download.platforms.packageManagersLabel')}</strong>
                    <div className="mt-1">
                      {platform.packageManagers.map(pm => (
                        <span key={pm} className="inline-block bg-blue-600 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {pm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full">
                  {t('download.platforms.download')} {platform.name}
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              {t('download.quickStart.orInstallVia')}
            </p>
            <div className="bg-gray-900 rounded-lg p-4 inline-block">
              <code className="text-green-400">{t('download.quickStart.homebrewCommand')}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="space-y-16">
        {downloadOptions.map((option, index) => (
          <section key={index}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {option.title}
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {option.description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {option.downloads.map((download, downloadIndex) => (
                <div key={downloadIndex} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {download.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {download.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t('download.common.version')}</span>
                      <span className="text-white">{download.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t('download.common.size')}</span>
                      <span className="text-white">{download.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t('download.common.platform')}</span>
                      <span className="text-white">{download.platform}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full inline-flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    {t('download.common.download')}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Installation Instructions */}
      <section className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {t('download.installation.title')}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('download.installation.fromSource.title')}</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {t('download.installation.fromSource.commands')}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('download.installation.usingPackageManager.title')}</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {t('download.installation.usingPackageManager.commands')}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="mt-16">
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {t('download.systemRequirements.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.systemRequirements.storage.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.systemRequirements.storage.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.systemRequirements.memory.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.systemRequirements.memory.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.systemRequirements.network.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.systemRequirements.network.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repository */}
      <section className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('download.openSource.title')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('download.openSource.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/cardity-org/cardity-core"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Github className="w-4 h-4 mr-2" />
              {t('download.openSource.viewOnGithub')}
            </a>
            <Link href="/docs/developer-guide" className="btn-secondary inline-flex items-center">
              <Code className="w-4 h-4 mr-2" />
              {t('download.openSource.buildFromSource')}
            </Link>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="mt-16">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('download.support.title')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('download.support.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/getting-started" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200">
              <div className="text-2xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.support.documentation.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.support.documentation.description')}
              </p>
            </Link>
            
            <a
              href="https://github.com/cardity-org/cardity-core/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-2xl mb-4">🐛</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.support.reportIssues.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.support.reportIssues.description')}
              </p>
            </a>
            
            <a
              href="mailto:hello@cardity.org"
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="text-2xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('download.support.contactUs.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('download.support.contactUs.description')}
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
