

export async function getLaunchParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        game: params.get("game") ?? null,
        lfgId: params.get("lfgId") ?? null,
        platform: params.get("platform") ?? null,
        action: params.get("action") ?? null
    };
}
