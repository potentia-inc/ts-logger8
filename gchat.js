import build from 'pino-abstract-transport';
export default async function (options) {
    const { link, timeout = 30000 } = options;
    return build(async (source) => {
        for await (const obj of source) {
            const { level, time, name, msg, ...misc } = obj;
            const date = new Date(time).toISOString();
            const body = [
                `[${date}] ${s(name)} *${s(level)}* ${s(msg)}`,
                JSON.stringify(misc),
            ].join('\n');
            fetch(link, {
                method: 'POST',
                headers: { 'content-type': 'application/ajax' },
                signal: AbortSignal.timeout(timeout),
                body,
            }).catch(console.error);
        }
    });
    function s(x) {
        return String(x);
    }
}
//# sourceMappingURL=gchat.js.map