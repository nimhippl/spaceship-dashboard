import { locateShip } from '@/api/spaceApi';

jest.mock('@/api/spaceApi', () => ({
    locateShip: jest.fn()
}));

describe('spaceApi.js', () => {
    it('calls locateShip with correct parameters', async () => {
        const response = { status: 'success', items: [], damage: 0 };
        locateShip.mockResolvedValue(response);

        const result = await locateShip(10, 20);
        expect(locateShip).toHaveBeenCalledWith(10, 20);
        expect(result).toEqual(response);
    });

    it('handles failure response', async () => {
        locateShip.mockRejectedValue(new Error('Network Error'));
        try {
            await locateShip(10, 20);
        } catch (error) {
            expect(error.message).toBe('Network Error');
        }
    });
});
