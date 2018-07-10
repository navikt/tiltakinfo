import { ActionType } from './redux/actions';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    if (action.type === ActionType.HENT_OPPFOLGING_OK) {
        (window as any).frontendlogger.event('tiltaksinfo.underOppfolging', {'underOppfolging': action.oppfolging.underOppfolging}, {}); // tslint:disable-line
    }
    next(action);
};