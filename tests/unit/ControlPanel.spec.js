import { shallowMount } from '@vue/test-utils';
import ControlPanel from '@/components/ControlPanel.vue';

describe('ControlPanel.vue', () => {
    it('emits move event when button is clicked', async () => {
        const wrapper = shallowMount(ControlPanel);
        const buttons = wrapper.findAll('button');
        await buttons[0].trigger('click');
        expect(wrapper.emitted().move).toBeTruthy();
        expect(wrapper.emitted().move[0]).toEqual(['up']);
    });
});
