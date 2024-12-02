"use client";
import { useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [strengthResult, setStrengthResult] = useState<any>(null);
  const [breachResult, setBreachResult] = useState<any>(null);
  const [hashResult, setHashResult] = useState<any>(null);

  // Form State
  const [passwordOptions, setPasswordOptions] = useState({
    length: 12,
    includeSymbols: true,
    includeNumbers: true,
    includeUppercase: true,
  });

  const [email, setEmail] = useState("");
  const [inputForHash, setInputForHash] = useState("");
  const [hashAlgorithm, setHashAlgorithm] = useState("sha256");

  const handleGeneratePassword = async () => {
    const params = new URLSearchParams(passwordOptions as any).toString();
    const res = await fetch(`/api/generate-password?${params}`);
    const data = await res.json();
    setPassword(data.password);
  };

  const handleTestStrength = async () => {
    const res = await fetch(`/api/strength?password=${password}`);
    const data = await res.json();
    setStrengthResult(data);
  };

  const handleCheckBreach = async () => {
    const res = await fetch(`/api/breach?email=${email}`);
    const data = await res.json();
    setBreachResult(data);
  };

  const handleGenerateHash = async () => {
    const res = await fetch(
      `/api/generate-hash?input=${inputForHash}&algorithm=${hashAlgorithm}`
    );
    const data = await res.json();
    setHashResult(data);
  };

  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="text-lg font-bold">Password Generator</h2>
        <button
          onClick={handleGeneratePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Password
        </button>
        {password && <p className="mt-2">Generated Password: {password}</p>}
      </section>

      <section>
        <h2 className="text-lg font-bold">Password Strength Tester</h2>
        <button
          onClick={handleTestStrength}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Strength
        </button>
        {strengthResult && (
          <div className="mt-2">
            <p>Score: {strengthResult.score}</p>
            <p>Feedback: {strengthResult.feedback.join(", ")}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Data Breach Checker</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 rounded"
        />
        <button
          onClick={handleCheckBreach}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Check Breach
        </button>
        {breachResult && (
          <div className="mt-2">
            <p>{breachResult.message}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Hash Generator</h2>
        <input
          type="text"
          value={inputForHash}
          onChange={(e) => setInputForHash(e.target.value)}
          placeholder="Enter input to hash"
          className="border p-2 rounded"
        />
        <select
          value={hashAlgorithm}
          onChange={(e) => setHashAlgorithm(e.target.value)}
          className="border p-2 rounded ml-2"
        >
          <option value="sha256">SHA-256</option>
          <option value="md5">MD5</option>
          <option value="sha1">SHA-1</option>
        </select>
        <button
          onClick={handleGenerateHash}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Generate Hash
        </button>
        {hashResult && (
          <div className="mt-2">
            <p>Hash: {hashResult.hash}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
