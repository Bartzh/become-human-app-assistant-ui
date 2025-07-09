"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 8);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": hashedPassword }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      router.push("/"); // 登录成功跳转首页
    } else {
      alert("登录失败，请检查用户名或密码");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>登录</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            用户名:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            密码:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </label>
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
}