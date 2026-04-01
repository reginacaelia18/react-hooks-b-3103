'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "@/components/AuthFormWrapper";
import SocialAuth from "@/components/SocialAuth";
import Link from "next/link";
import { toast } from "react-toastify";

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  captchaInput: string;
}

interface ErrorObject {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  captcha?: string;
}

const DEFAULT_CAPTCHA = "AbCdEf";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaInput: ""
  });

  const [errors, setErrors] = useState<ErrorObject>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorObject = {};

    if (!formData.username) {
      newErrors.username = "Username wajib diisi";
    } else if (formData.username.length > 8) {
      newErrors.username = "Maksimal 8 karakter";
    }

    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else {
      const atIndex = formData.email.indexOf("@");
      if (atIndex <= 0 || atIndex === formData.email.length - 1) {
        newErrors.email = "'@'";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    if (!formData.captchaInput) {
      newErrors.captcha = "Captcha wajib diisi";
    } else if (formData.captchaInput !== DEFAULT_CAPTCHA) {
      newErrors.captcha = "Captcha salah";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Registrasi gagal!", { theme: "dark" });
      return;
    }

    toast.success("Register berhasil!", { theme: "dark" });

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">

        <div>
          <label className="text-sm font-medium">Username (max 8 karakter)</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            maxLength={8}
            placeholder="Masukkan username"
            className={`w-full px-4 py-2 rounded border ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            className={`w-full px-4 py-2 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Nomor Telepon</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Masukkan nomor telepon"
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            className={`w-full px-4 py-2 rounded border ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Konfirmasi Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Masukkan ulang password"
            className={`w-full px-4 py-2 rounded border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <span className="text-sm font-medium">Captcha:</span>

          <span className="font-mono bg-gray-200 px-3 py-1 rounded text-lg">
            
            {DEFAULT_CAPTCHA}
          </span>

          <input
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            placeholder="Masukkan captcha"
            className={`w-full mt-2 px-4 py-2 rounded border ${
              errors.captcha ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Register
        </button>

        <p className="text-center text-sm text-gray-500">Atau masuk dengan</p>
        <SocialAuth />

        <p className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
}