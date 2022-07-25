import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_CODE } from '../CodeEditor/CodeEditor';
import CodeEditorWindow from './CodeEditorWindow';


const props = {
    language: 'javascript',
    code:  DEFAULT_CODE,
    onCodeChange: jest.fn()
}

const LOADING = 'Loading...';

/**
 * Until now, I've not found any correct way to test Monaco Editor with Testing Library as it doesn't render correctly in tests. 
 */
describe('rendering', () => {
    it('should render correctly', async() => {
        render(<CodeEditorWindow {...props} />);
        expect(screen.getByText(LOADING)).toBeInTheDocument();
    });
});