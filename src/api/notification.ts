import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const setNoti = (yy: number, mm: number, dd: number) => {
  const current = new Date().getTime();
  const alarm = new Date(yy, mm - 1, dd).getTime();
  const time = Math.ceil((alarm - current) / 1000);

  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Dodol',
      body: '캡슐이 열렸습니다!',
    },
    trigger: {
      seconds: time,
    },
  });
};

export default setNoti;
