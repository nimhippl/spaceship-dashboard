import { shallowMount } from '@vue/test-utils';
import ConnectionStatus from '@/components/ConnectionStatus.vue';

describe('ConnectionStatus.vue', () => {
    it('shows connected status', () => {
        const wrapper = shallowMount(ConnectionStatus, {
            props: { status: 'Connected' }
        });
        expect(wrapper.text()).toContain('Соединение установлено');
    });

    it('shows disconnected status', () => {
        const wrapper = shallowMount(ConnectionStatus, {
            props: { status: 'Disconnected' }
        });
        expect(wrapper.text()).toContain('Нет соединения');
    });
});
