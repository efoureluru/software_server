import type { Ride } from '../data/rides';
import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CartItem extends Ride {
    quantity: number;
}

interface TicketProps {
    items: CartItem[];
    total: number;
    date: string;
    ticketId: string;
    mobileNumber?: string;
    earnedPoints?: number;
}

export const Ticket = forwardRef<HTMLDivElement, TicketProps & { subTickets?: any[], skipMaster?: boolean }>(({ total, date, ticketId, subTickets, skipMaster }, ref) => {

    const TicketContent = ({ data, total: ticketTotal, hasPageBreak = false }: { data: any, total?: number, hasPageBreak?: boolean }) => {
        // const displayItems = ticketItems || items; // kept for reference if needed for other layouts
        const displayTotal = ticketTotal !== undefined ? ticketTotal : total;

        // Generate formatting for Date and Time
        const now = new Date();
        const dateString = now.toLocaleDateString('en-GB').replace(/\//g, '-'); // en-GB gives DD/MM/YYYY, replace / with -
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Format ID to match "966-R1" style if possible, or just take last chunk
        const displayId = data.id ? data.id.slice(-6).toUpperCase() : 'UNK-ID';

        return (
            <div className={`bg-white text-black font-mono w-full ${hasPageBreak ? 'page-break-before' : ''}`}
                style={{
                    pageBreakBefore: hasPageBreak ? 'always' : 'auto',
                    minWidth: '3in',
                    backgroundColor: 'white',
                    fontFamily: "'Courier New', Courier, monospace" // Ensure monospaced feel
                }}
            >
                <style>{`
                    @media print {
                        @page { 
                            margin: 0 !important; 
                            size: 3in auto !important;
                        }
                        html, body {
                            width: 3in !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            background: white !important;
                            overflow: visible !important;
                        }
                        .print-container {
                            width: 3in !important;
                        }
                        .page-break-before {
                            page-break-before: always !important;
                        }
                        /* Ensure background colors print */
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                    }
                `}</style>

                <div className="flex flex-col w-full p-1 box-border">
                    {/* HEADER SECTION */}
                    <div className="mb-2">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h1 className="font-black text-3xl tracking-tight leading-none">EFOUR</h1>
                            <span className="font-bold text-lg tracking-wider leading-none">{dateString}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="bg-black text-white px-1 py-0.5 mt-0.5">
                                <span className="font-bold text-[0.6rem] tracking-wide block whitespace-nowrap">Eat. Enjoy. Entertain @ Eluru</span>
                            </div>
                            <div className="text-right leading-tight">
                                <div className="font-bold text-xs">{timeString}</div>
                                <div className="font-bold text-xs whitespace-nowrap">ID: {displayId}</div>
                            </div>
                        </div>
                    </div>

                    {/* BODY SECTION */}
                    <div className="flex justify-between items-center mb-2">
                        {/* LEFT: FREE RIDE + PRICE */}
                        <div className="flex flex-col items-center w-1/2">
                            <div className="text-center font-bold text-xl leading-none mb-1 whitespace-nowrap">
                                FREE RIDE
                            </div>
                            <div className="bg-black text-white rounded-lg w-20 h-20 flex items-center justify-center">
                                <span className="font-bold text-3xl">{displayTotal}/-</span>
                            </div>
                        </div>

                        {/* RIGHT: QR CODE */}
                        <div className="flex flex-col items-center w-1/2">
                            <div className="border-2 border-black rounded-xl p-1 mb-0.5">
                                <QRCodeSVG value={JSON.stringify({ id: data.id })} size={85} level="M" />
                            </div>
                            <span className="font-bold text-xs mt-0.5">QR CODE</span>
                        </div>
                    </div>

                    {/* HORIZONTAL RULE */}
                    <hr className="border-t-2 border-gray-300 mb-1" />

                    {/* FOOTER SECTION */}
                    <div className="text-center space-y-0.5">
                        <div className="text-[0.6rem] font-bold uppercase tracking-tight whitespace-nowrap">
                            VALID ON BOOKED DATE ONLY . EXPIRES ON SCAN
                        </div>

                        <div className="text-xs font-medium pt-0.5">
                            For Reward Points Login to:
                        </div>

                        <div className="font-bold text-base tracking-wide uppercase leading-tight">
                            WWW. EFOUR - ELURU.COM
                        </div>

                        <div className="text-[0.6rem] font-bold uppercase tracking-tight whitespace-nowrap mt-1">
                            NO REFUND - NON TRANSFERABLE - VISIT AGAIN
                        </div>

                        <div className="font-bold text-lg mt-0.5 leading-none">
                            Ph: 70369 23456
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div ref={ref}>
            {/* Main Receipt (Only show if NOT skipping) */}
            {!skipMaster && <TicketContent data={{ id: ticketId }} />}

            {/* Individual Tickets / Combo Coupons */}
            {subTickets && subTickets.map((ticket, idx) => (
                <TicketContent
                    key={ticket.id}
                    data={ticket}
                    total={ticket.amount}
                    hasPageBreak={!skipMaster || idx > 0}
                />
            ))}
        </div>
    );
});

Ticket.displayName = 'Ticket';
