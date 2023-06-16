const getNotificationPermission = async () => {
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission === 'denied') {
    return false;
  }
  return (await Notification.requestPermission()) === 'granted';
};

interface INotificationProps {
  title: string;
  body: string;
  icon?: string;
  image?: string;
}
export const showNotification = async ({ title, body, icon }: INotificationProps) => {
  if (await getNotificationPermission()) {
    new Notification(title, { body, icon });
  }
};
