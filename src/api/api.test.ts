import { featureQueryParams } from './api';

describe('api', () => {
    describe('featureQueryParams', () => {
        it('skal returnere streng med ett query param riktig formattert', () => {
            const features = ['feature1'];
            expect(featureQueryParams(features)).toEqual('?feature=feature1');
        });
        it('skal returnere streng med to query params riktig formattert', () => {
            const features = ['feature1', 'feature2'];
            expect(featureQueryParams(features)).toEqual('?feature=feature1&feature=feature2');
        });
    });
});