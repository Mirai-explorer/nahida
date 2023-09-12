import React from "react";

export default function BlogLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="blog relative">{children}</div>
    )
}