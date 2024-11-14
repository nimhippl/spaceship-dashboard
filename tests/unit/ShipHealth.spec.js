import { shallowMount } from '@vue/test-utils';
import ShipHealth from '@/components/ShipHealth.vue';

describe('ShipHealth.vue', () => {
    it('displays the correct health level', () => {
        const wrapper = shallowMount(ShipHealth, {
            props: { health: 75 }
        });
        expect(wrapper.text()).toContain('Прочность корабля: 75%');
    });
});
