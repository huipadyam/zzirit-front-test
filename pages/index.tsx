import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://api.zzirit.shop/api/auth/basic/login', {
      // const res = await fetch('http://13.209.179.229:8080/api/auth/basic/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ← 중요: 쿠키 받아오기
        body: JSON.stringify({
          username: email,
          password,
        }),
      });
  
      if (res.ok) {
        setResponse('로그인 성공!');
      } else {
        setResponse('로그인 실패: ' + res.status);
      }
    } catch (error) {
      setResponse('로그인 실패: ' + error);
    }
  };  

  return (
    <div style={{ padding: 20 }}>
      <h1>로그인</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>로그인</button>
      <pre>{response}</pre>

      <h2>소셜 로그인</h2>
      <a href="http://api.zzirit.shop/oauth2/authorization/naver">
        <button>네이버 로그인</button>
      </a>
      <a href="http://api.zzirit.shop/oauth2/authorization/google">
        <button>구글 로그인</button>
      </a>
      <a href="http://api.zzirit.shop/oauth2/authorization/kakao">
        <button>카카오 로그인</button>
      </a>
    </div>
  );
}
