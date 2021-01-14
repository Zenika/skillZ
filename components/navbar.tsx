import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { useAuth } from 'use-auth0-hooks';

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function Navbar() {
  const { pathname, query } = useRouter();
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          {!isLoading && (
            isAuthenticated ? (
              <>
                <li>
                  <Link href='/profile'>
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <button onClick={() => logout({ returnTo: BASE_URL })}>Log out</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => login({ appState: { returnTo: { pathname, query } } })}>
                  Log in
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};