import style from '../../style.module.scss';
import classNames from 'classnames';
import AppButton from '../../../../components/button/AppButton.tsx';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../../store/hooks.ts';
import { selectAllSubscriptions } from '../../../../features/general/generalSelect.ts';
import { selectUserInfo } from '../../../../features/userInfo/userInfoSelect.ts';
import { useMemo } from 'react';
import { TSubscription } from '../../../../services/generalInfo.ts';

const Subscription = () => {
  const { formatMessage, formatDate } = useIntl();
  const subscription = useAppSelector(selectAllSubscriptions);
  const user = useAppSelector(selectUserInfo);

  const userSubscriptionData = useMemo(() => {
    return {
      startDate: user?.start_date,
      endDate: user?.end_date,
      subscription: (subscription as TSubscription[])?.find((item) => item.id === user?.subscription_id),
    };
  }, [subscription, user]);

  return (
    <div className={style.subscriptionWrapper}>
      <h4>{formatMessage({ id: 'profile.subscription' })}</h4>
      {userSubscriptionData?.subscription ? (
        <>
          <div className={classNames(style.textItem, style.additionalDataWrapper)}>
            <div>
              <div className={'text'}>{userSubscriptionData.subscription.name}</div>
              <div className={'table-headline'} style={{ marginTop: 4 }}>
                {formatDate(userSubscriptionData?.startDate) + '-' + formatDate(userSubscriptionData?.endDate)}
              </div>
            </div>
            <div className={'text'}>{userSubscriptionData.subscription.price + ' USDT'}</div>
          </div>
        </>
      ) : (
        <>
          <div className={classNames('text', style.additionalDataWrapper)}>
            {formatMessage({ id: 'profile.subscription.empty.content' })}
          </div>
          <div className={style.btnWrapper}>
            <AppButton color={'secondary'} classes={{ root: style.btn }}>
              {formatMessage({ id: 'profile.subscription.btn.select' })}
            </AppButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscription;
