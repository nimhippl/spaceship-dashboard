import { shallowMount } from '@vue/test-utils';
import FlatMap from '@/components/FlatMap.vue';

jest.mock('@/assets/icons/fuel-barrel.svg', () => 'test-file-stub');
jest.mock('@/assets/icons/spaceship.svg', () => 'test-file-stub');
jest.mock('@/assets/icons/asteroid.svg', () => 'test-file-stub');

describe('FlatMap.vue', () => {
    it('renders map objects correctly', () => {
        const objects = [{ id: 1, x: 50, y: 50, type: 'spaceship', name: 'SL-342' }];
        const wrapper = shallowMount(FlatMap, {
            props: { objects, currentX: 0, currentY: 0, fuelBarrels: 0 }
        });

        expect(wrapper.findAll('image').length).toBe(objects.length);
    });

    it('renders fuel barrel info correctly', () => {
        const wrapper = shallowMount(FlatMap, {
            props: { objects: [], currentX: 0, currentY: 0, fuelBarrels: 2 }
        });

        const fuelInfo = wrapper.find('.fuel-barrel-info');
        expect(fuelInfo.exists()).toBe(true);
        expect(fuelInfo.find('.fuel-barrel-count').text()).toContain('x 2');
    });
});
