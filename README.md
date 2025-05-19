# CodeClauseInternship_File-Sharing-Platform
# 🔐 File Sharing App – React + Supabase

> 📌 **Note:** Please switch to the `master` branch to view all project files.

## Aim
Create a secure and anonymous file-sharing platform where users can upload files, optionally protect them with a password and expiry date, and share them via unique links.

## Description
This project allows users to upload files securely and generate shareable links. It includes:

- **Upload File** – Drag-and-drop or manual upload functionality.
- **Password Generator** – Optional password protection for files.
- **Link Expiry** – Optional expiry datetime for access.
- **Access Page** – Users can download shared files if access is valid.

## 💻 Technologies Used
- **React (Vite)** – Fast, modular JavaScript frontend framework.
- **Tailwind CSS** – Utility-first CSS for rapid styling.
- **Supabase** – Backend-as-a-service for authentication, storage, and database.


## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

## ⚙️ Scripts

- `npm install` – Install all dependencies
- `npm run dev` – Start development server

## ✅ Features

- Anonymous file uploads
- Drag & Drop + manual selection
- Password and expiry date for access control
- Clipboard support for copying links and passwords
- Secure file viewer/download page


