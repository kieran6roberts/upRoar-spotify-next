import { render } from "@testing-library/react";

import AuthProvider from "@/context/AuthContext";
import ThemeProvider from "@/context/ThemeContext";

function renderWithContext ({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
}

function customRender (ui, options) {
    render(ui, {
        wrapper: renderWithContext,
        ...options
    });
}

export { customRender as render };
