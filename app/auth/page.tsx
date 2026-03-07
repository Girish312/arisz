"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from '@/lib/auth-provider';
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";


export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  // Remove local user state, use context only
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSignUpSuccess(true);
        setIsSignUp(false);
        setEmail("");
        setPassword("");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
          // AuthProvider context will update user state automatically
        // router.replace("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    // AuthProvider context will update user state automatically
  };

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        ) : (
          <>
            {signUpSuccess ? (
              <div className="text-center">
                <p className="mb-4 text-green-600 font-semibold">Sign up successful! Please sign in.</p>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded"
                  onClick={() => {
                    setIsSignUp(false);
                    setSignUpSuccess(false);
                    setTimeout(() => {
                      emailInputRef.current?.focus();
                    }, 100);
                  }}
                  disabled={loading}
                >
                  Go to Sign In
                </button>
              </div>
            ) : !user && (
              <form onSubmit={handleAuth} className="space-y-4">
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <button
                  type="button"
                  className="w-full text-blue-600 mt-2"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                >
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
