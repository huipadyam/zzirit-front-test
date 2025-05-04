import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    const url = 'https://api.zzirit.shop/api/auth/basic/login';
    const requestBody = {
      username: email,
      password,
    };

    console.log('[요청 URL]', url);
    console.log('[요청 바디]', requestBody);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      console.log('[응답 상태]', res.status);
      const result = await res.text(); // JSON 아닌 경우 대비
      console.log('[응답 내용]', result);

      if (res.ok) {
        setResponse('로그인 성공!');
      } else {
        setResponse('로그인 실패: ' + res.status);
      }
    } catch (error) {
      console.log('[에러 발생]', error);
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
