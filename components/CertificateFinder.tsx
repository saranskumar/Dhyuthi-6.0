"use client";

import { useState } from "react";
import {
    Search,
    Loader2,
    AlertCircle,
    CheckCircle,
    Ticket,
    Mail,
    Phone,
    Award,
    Swords,
    BookOpen,
    Check,
    Download,
    Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Helper to convert export URL to view URL
const getViewUrl = (url: string) => {
    try {
        const idMatch = url.match(/[?&]id=([^&]+)/);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/file/d/${idMatch[1]}/view`;
        }
    } catch (e) {
        return url;
    }
    return url;
};

// Strong types
type CertType = "winner" | "competition" | "workshop";

interface CertificateData {
    name: string;
    ticketId?: string;
    email?: string;
    phone?: string;
    winner?: string; // google drive url or undefined
    competition?: string;
    workshop?: string;
}

export default function CertificateFinder() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CertificateData | null>(null);
    const [error, setError] = useState("");

    const [downloadingType, setDownloadingType] = useState<CertType | null>(null);

    const [downloaded, setDownloaded] = useState<Record<CertType, boolean>>({
        winner: false,
        competition: false,
        workshop: false,
    });

    const API =
        "https://script.google.com/macros/s/AKfycbzzEF3cmK_uau99YaaMs-WBmBvvyGNK5ZTBC9wQXxU12QlM6JRbbaIGqpYCowBNuWtfNQ/exec";

    async function forceDownload(url: string, type: CertType) {
        if (!url) return;

        // Extract ID
        let id = "";
        try {
            const match = url.match(/[?&]id=([^&]+)/);
            if (match && match[1]) id = match[1];
        } catch (e) { console.error(e); }

        if (!id) {
            // Fallback to direct link if ID extraction fails
            window.location.href = url;
            return;
        }

        // Loading state
        setDownloadingType(type);

        // Safe renamed filename
        const safeName = data?.name ? data.name.replace(/[^a-zA-Z0-9]/g, "_") : "Certificate";
        const filename = `${safeName}_${type}.pdf`;

        try {
            // Fetch from OUR backend proxy (code.gs) which returns base64
            // This bypasses CORS completely and guarantees renaming
            const proxyUrl = `${API}?mode=download&id=${id}`;
            const res = await fetch(proxyUrl);
            const json = await res.json();

            if (!json.success || !json.fileData) {
                throw new Error(json.error || "Proxy download failed");
            }

            // Convert Base64 to Blob
            const binaryString = window.atob(json.fileData as string);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "application/pdf" });
            const blobUrl = window.URL.createObjectURL(blob);

            // Trigger Download
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);

        } catch (err) {
            console.warn("Proxy fetch failed, falling back to iframe:", err);

            // Fallback: force download through hidden iframe (Default Name)
            try {
                const iframe = document.createElement("iframe");
                iframe.style.display = "none";
                iframe.src = url + "&confirm=t";
                document.body.appendChild(iframe);
                setTimeout(() => {
                    if (document.body.contains(iframe)) iframe.remove();
                }, 10000);
            } catch (e) {
                window.location.href = url;
            }
        }

        // Mark as downloaded
        setDownloaded(prev => ({ ...prev, [type]: true }));
        setDownloadingType(null);
    }

    async function search(queryOverride?: string) {
        setLoading(true);
        setError("");
        setData(null);
        setDownloaded({ winner: false, competition: false, workshop: false });
        setDownloadingType(null);

        const q = queryOverride || query;

        if (!q.trim()) {
            setError("Please enter your Phone, Email, or Ticket ID.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API}?mode=certs&q=${encodeURIComponent(q.trim())}`);

            if (!res.ok) {
                throw new Error("Server error. Please try again later.");
            }

            const result = await res.json();

            if (!result.success) {
                setError(result.error || "No certificates found for the provided details.");
            } else {
                // map API result to CertificateData, while keeping extra fields if they match
                const mapped: CertificateData = {
                    name: result.name,
                    ticketId: result.ticketId,
                    email: result.email,
                    phone: result.phone,
                    winner: result.winner,
                    competition: result.competition,
                    workshop: result.workshop,
                };
                setData(mapped);
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("Unable to connect to the server. Please check your internet connection and try again.");
        }

        setLoading(false);
    }

    // Reusable download button component
    function DownloadButton({
        url,
        label,
        icon: Icon,
        color,
        type
    }: {
        url?: string;
        label: string;
        icon: LucideIcon;
        color: { bg: string; text: string; border: string; hover: string; icon: string };
        type: CertType;
    }) {
        if (!url) return null;

        const isDone = downloaded[type];
        const isDownloading = downloadingType === type;

        // If downloading, show Loading state
        if (isDownloading) {
            return (
                <button
                    disabled
                    className="group flex items-center justify-between w-full py-3 px-5 rounded-xl font-semibold border transition-all mt-3 bg-gray-50 text-gray-500 border-gray-200 cursor-wait"
                >
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                        Downloading...
                    </span>
                </button>
            );
        }

        // If downloaded, show View Button
        if (isDone) {
            const viewUrl = getViewUrl(url);
            return (
                <button
                    onClick={() => window.open(viewUrl, '_blank')}
                    className="group flex items-center justify-between w-full py-3 px-5 rounded-xl font-semibold border transition-all mt-3 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                    <span className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        View Certificate
                    </span>
                    <Eye className="w-5 h-5 text-green-600 opacity-60 group-hover:opacity-100" />
                </button>
            );
        }

        // Default Download Button
        return (
            <button
                onClick={() => forceDownload(url, type)}
                className={`group flex items-center justify-between w-full py-3 px-5 rounded-xl font-semibold border transition-all mt-3
        ${`${color.bg} ${color.text} ${color.border} hover:${color.hover} hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
          `}
            >
                <span className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color.icon}`} />
                    {label}
                </span>
                <Download className="w-4 h-4 opacity-60 group-hover:opacity-100" />
            </button>
        );
    }

    return (
        <div className="flex justify-center items-start py-20 px-4 font-sans relative z-10">
            <div className="w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
                <div className="text-center mb-8">
                    <div className="inline-block mb-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        Certificate Finder
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Enter your registered details to access your certificates
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        className="w-full p-4 pl-12 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all"
                        placeholder="Phone, Email, or Ticket ID"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !loading && search()}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                {/* Search Button */}
                <button
                    onClick={() => search()}
                    disabled={loading}
                    className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Fetching certificate...
                        </>
                    ) : (
                        "Find Certificate"
                    )}
                </button>


                {/* Error Message */}
                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-200">{error}</p>
                    </div>
                )}

                {/* Result Card */}
                {data && (
                    <div className="mt-2 p-6 bg.white/5 border border-white/10 rounded-3xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md border border-white/10">
                                <CheckCircle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white leading-tight">{data.name}</h2>
                                <p className="text-sm text-gray-400">Here are your available downloads</p>
                            </div>
                        </div>

                        {/* Participant Details */}
                        <div className="space-y-2 mb-6">
                            {data.ticketId && (
                                <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                                    <Ticket className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span className="text-sm">{data.ticketId}</span>
                                </div>
                            )}

                            {data.email && (
                                <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span className="text-sm truncate">{data.email}</span>
                                </div>
                            )}

                            {data.phone && (
                                <div className="flex items-center gap-3 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                                    <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span className="text-sm">{data.phone}</span>
                                </div>
                            )}
                        </div>

                        {/* Certificates Section */}
                        <div className="border-t border-white/10 pt-5">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Available Certificates
                            </h3>

                            {!data.winner && !data.competition && !data.workshop && (
                                <p className="text-gray-400 text-sm text-center py-4">
                                    No certificates available yet.
                                </p>
                            )}

                            <DownloadButton
                                url={data.winner}
                                type="winner"
                                label="Winner Certificate"
                                icon={Award}
                                color={{
                                    bg: "bg-yellow-500/10",
                                    text: "text-yellow-200",
                                    border: "border-yellow-500/30",
                                    hover: "bg-yellow-500/20",
                                    icon: "text-yellow-400",
                                }}
                            />

                            <DownloadButton
                                url={data.competition}
                                type="competition"
                                label="Competition Certificate"
                                icon={Swords}
                                color={{
                                    bg: "bg-purple-500/10",
                                    text: "text-purple-200",
                                    border: "border-purple-500/30",
                                    hover: "bg-purple-500/20",
                                    icon: "text-purple-400",
                                }}
                            />

                            <DownloadButton
                                url={data.workshop}
                                type="workshop"
                                label="Workshop Certificate"
                                icon={BookOpen}
                                color={{
                                    bg: "bg-blue-500/10",
                                    text: "text-blue-200",
                                    border: "border-blue-500/30",
                                    hover: "bg-blue-500/20",
                                    icon: "text-blue-400",
                                }}
                            />
                        </div>
                    </div>
                )}

            </div >
        </div >
    );
}
