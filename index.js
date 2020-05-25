const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN, URL },
} = require('process');

const sendPushOverNotification = require('./pushover-helper');

const getSuccessMsg = () =>
    `Hi there, we just deployed the site successfully  🎉\n\n👉 ${URL}`;

const getErrorMsg = () =>
    `Hi there, Latest build failed 😱\n\nCheck your build's log for more details\n\n👉 ${URL}`;

const precheck = () => {
    if (!PUSHOVER_USER_KEY || !PUSHOVER_API_TOKEN) {
        console.log(
            'PUSHOVER_USER_KEY or PUSHOVER_API_TOKEN is not available as environment variable'
        );
        return false;
    }
    return true;
};
module.exports = {
    async onSuccess() {
        if (precheck()) {
            console.log('Sending build success message via PushOver');
            const message = getSuccessMsg();
            await sendPushOverNotification({ message });
        }
    },
    async onError() {
        if (precheck()) {
            console.log('Sending build failed message via PushOver');
            const message = getErrorMsg();
            await sendPushOverNotification({
                message,
                priority: 1,
                sound: 'alien',
            });
        }
    },
};
