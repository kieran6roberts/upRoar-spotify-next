import "whatwg-fetch";

import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import AuthProvider from "@/context/AuthContext";
import ThemeProvider from "@/context/ThemeContext";

const server = setupServer(
    rest.post("/local/register", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({
          jwt: "mock jwt",
            statusCode: 200,
            user: {
              username: "kieran"
            },
            username: "kieran"
        }));
    }),
    rest.post("https://accounts.spotify.com/api/token", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            access_token: "access-token",
            refresh_token: "refresh-token"
        }));
    }),
    rest.get("https://api.spotify.com/v1/me", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ id: "username" }));
    }),
    rest.get("https://api.spotify.com/users/me", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ id: "username" }));
    }),
    rest.post("*", (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);

      return res(ctx.status(500), ctx.json({ error: "Please add request handler" }));
    })
  );

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

export {
    customRender as render,
    rest,
    server
 };
