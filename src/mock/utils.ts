export function erLocalhost() {
    const host: string = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}

export function erFullMock(): boolean {
    return process.env.REACT_APP_MOCK_FULL === 'true';
}

export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}
