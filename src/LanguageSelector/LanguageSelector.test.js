import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelector, { LANGUAGES_CHOICE } from './LanguageSelector';



describe('rendering', () => {
    it('should render correctly', async() => {
        render(<LanguageSelector handleLanguageChange={jest.fn()}/>);
        expect(screen.getByText(LANGUAGES_CHOICE)).toBeInTheDocument();
    });

    describe('selecting a value', () => {
        it('should select bash option', () => {
            const BASH_OPTION = {
                id: 46,
                name: "Bash (5.0.0)",
                label: "Bash (5.0.0)",
                value: "bash",
            };
            render(<LanguageSelector handleLanguageChange={jest.fn()}/>);
            const selector = screen.getByRole('combobox');
            fireEvent.change(selector, { target: { value: BASH_OPTION.value }});
            expect(screen.getByText(BASH_OPTION.name)).toBeInTheDocument();
        });
    });
});