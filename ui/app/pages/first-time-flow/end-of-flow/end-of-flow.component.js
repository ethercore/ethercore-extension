import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/ui/button'
import { DEFAULT_ROUTE } from '../../../helpers/constants/routes'

export default class EndOfFlowScreen extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  }

  static propTypes = {
    history: PropTypes.object,
    completeOnboarding: PropTypes.func,
    completionMetaMetricsName: PropTypes.string,
  }

  render () {
    const { t } = this.context
    const { history, completeOnboarding, completionMetaMetricsName } = this.props

    return (
      <div className="end-of-flow">
        <div className="app-header__logo-container">
          <img
            className="app-header__metafox-logo app-header__metafox-logo--horizontal"
            src="/images/logo/ere-logo.svg"
            height={30}
          />
          <img
            className="app-header__metafox-logo app-header__metafox-logo--icon"
            src="/images/logo/single-logo.svg"
            height={42}
            width={42}
          />
        </div>
        <div className="end-of-flow__emoji">🎉</div>
        <div className="first-time-flow__header">
          { t('congratulations') }
        </div>
        <div className="first-time-flow__text-block end-of-flow__text-1">
          { t('endOfFlowMessage1') }
        </div>
        <div className="first-time-flow__text-block end-of-flow__text-2">
          { t('endOfFlowMessage2') }
        </div>
        <div className="end-of-flow__text-3">
          { '• ' + t('endOfFlowMessage3') }
        </div>
        <div className="end-of-flow__text-3">
          { '• ' + t('endOfFlowMessage4') }
        </div>
        <div className="end-of-flow__text-3">
          { '• ' + t('endOfFlowMessage5') }
        </div>
        <div className="end-of-flow__text-3">
          { '• ' + t('endOfFlowMessage6') }
        </div>
        <div className="end-of-flow__text-3">
          { '• ' + t('endOfFlowMessage7') }
        </div>
        <div className="first-time-flow__text-block end-of-flow__text-4">
          *EtherCore Extension cannot recover your seedphrase.
        </div>
        <Button
          type="primary"
          className="first-time-flow__button"
          onClick={async () => {
            await completeOnboarding()
            this.context.metricsEvent({
              eventOpts: {
                category: 'Onboarding',
                action: 'Onboarding Complete',
                name: completionMetaMetricsName,
              },
            })
            history.push(DEFAULT_ROUTE)
          }}
        >
          { 'All Done' }
        </Button>
      </div>
    )
  }
}
