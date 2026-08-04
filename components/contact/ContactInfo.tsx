// ─── components/contact/ContactInfo.tsx ───────────────────────────────────────
// Company details block for showroom location and hours.
// Server Component.

import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

const INFO_BLOCKS: InfoItem[] = [
  {
    icon: <MapPin className="size-5 text-[--color-accent]" />,
    title: "Flagship Showroom",
    lines: ["142 Mercer Street", "SoHo, New York, NY 10012", "United States"],
  },
  {
    icon: <Phone className="size-5 text-[--color-accent]" />,
    title: "Concierge Telephone",
    lines: ["+1 (212) 555-0198", "Mon–Fri, 9:00 AM – 6:00 PM EST"],
  },
  {
    icon: <Mail className="size-5 text-[--color-accent]" />,
    title: "Direct Inquiries",
    lines: [
      "Showroom: showroom@furniturelux.com",
      "Support: support@furniturelux.com",
    ],
  },
  {
    icon: <Clock className="size-5 text-[--color-accent]" />,
    title: "Showroom Hours",
    lines: [
      "Monday – Saturday: 10:00 AM – 7:00 PM",
      "Sunday: By Appointment Only",
    ],
  },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8 bg-[--color-muted]/30 border border-[--color-border] rounded-3xl p-8 md:p-10">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-[--color-foreground]">
        The Showroom
      </h2>

      <div className="flex flex-col gap-6 font-sans">
        {INFO_BLOCKS.map((block) => (
          <div key={block.title} className="flex gap-4">
            <div className="flex items-center justify-center size-10 rounded-full bg-[--color-card] border border-[--color-border] shrink-0">
              {block.icon}
            </div>
            <div className="flex flex-col text-xs leading-normal">
              <h3 className="font-semibold text-[--color-foreground] text-sm mb-1.5 uppercase tracking-wider text-[11px]">
                {block.title}
              </h3>
              {block.lines.map((line, idx) => (
                <p key={idx} className="text-[--color-muted-foreground] font-light">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[--color-border]/60 pt-6 mt-2">
        <h3 className="font-serif text-sm font-semibold text-[--color-foreground] mb-2">
          Design Consultations
        </h3>
        <p className="font-sans text-xs text-[--color-muted-foreground] font-light leading-relaxed">
          Book a private 1-on-1 walkthrough with our design specialists. We will walk you through material options, custom floor layout drafting, and premium swatches.
        </p>
      </div>
    </div>
  );
}
