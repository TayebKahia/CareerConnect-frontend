import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CandidatesProvider } from "../../context/candidates-context"
import { Toaster } from "../../components/toaster"

export const metadata: Metadata = {
  title: "Career Connect",
  description: "Discover Your Perfect Career Path",
  icons: {
    icon: "/bag.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CandidatesProvider>{children}</CandidatesProvider>
        <Toaster />
      </body>
    </html>
  )
}
