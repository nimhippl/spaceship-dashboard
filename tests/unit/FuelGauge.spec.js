import { shallowMount } from '@vue/test-utils';
import FuelGauge from '@/components/FuelGauge.vue';

describe('FuelGauge.vue', () => {
    it('displays the correct fuel level', () => {
        const wrapper = shallowMount(FuelGauge, {
            props: { fuel: 80 }
        });
        expect(wrapper.text()).toContain('Запас топлива: 80%');
    });
});
