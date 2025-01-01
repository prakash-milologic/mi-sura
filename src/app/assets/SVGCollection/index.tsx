import { SVGProps } from "react";

export const DailyYieldIcon = (props?: SVGProps<SVGSVGElement>,width:number=18,height:number=25) => {
    return (
        <svg width={width} height={height} viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1.47265 13.8371H5.40948V22.9652C5.40948 24.3091 7.09124 24.943 7.98308 23.9288L17.6277 13.0257C18.4686 12.0748 17.7933 10.5915 16.5193 10.5915H12.5824V1.46335C12.5824 0.119486 10.9007 -0.514414 10.0088 0.499825L0.364222 11.4029C-0.463914 12.3537 0.211335 13.8371 1.47265 13.8371Z" fill="#FDB216" />
        </svg>
    );
};
export const CarbonEmission = ({ isDark = false }: { isDark?: boolean }) => {
    return (
        <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.2567 46.6667C42.3833 46.69 45.3933 45.5233 47.7033 43.4233C55.3333 36.75 51.25 23.3567 41.1933 22.0967C37.6 0.303337 6.16998 8.56334 13.6133 29.3067" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.4867 30.2633C16.2501 29.6333 14.8734 29.3067 13.4967 29.33C2.62338 30.1 2.64672 45.92 13.4967 46.69" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M37.4133 23.0767C38.6267 22.47 39.9333 22.1433 41.2867 22.12" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M30.8228 43.1667H30.8438" stroke={isDark ? "white" : "#505050"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.4895 43.1667H21.5105" stroke={isDark ? "white" : "#505050"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M26.1562 50.1667H26.1772" stroke={isDark ? "white" : "#505050"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const CoalSaved = ({ isDark = false }: { isDark?: boolean }) => {
    return (
        <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8766 28.6066C43.4875 28.6066 48.8466 23.2475 48.8466 16.6367C48.8466 10.0258 43.4875 4.66666 36.8766 4.66666C30.2658 4.66666 24.9066 10.0258 24.9066 16.6367C24.9066 23.2475 30.2658 28.6066 36.8766 28.6066Z" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M15.34 45.36C19.309 45.36 22.5267 42.1424 22.5267 38.1733C22.5267 34.2042 19.309 30.9867 15.34 30.9867C11.3709 30.9867 8.15332 34.2042 8.15332 38.1733C8.15332 42.1424 11.3709 45.36 15.34 45.36Z" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M39.28 51.3333C42.5789 51.3333 45.2533 48.659 45.2533 45.36C45.2533 42.061 42.5789 39.3867 39.28 39.3867C35.981 39.3867 33.3066 42.061 33.3066 45.36C33.3066 48.659 35.981 51.3333 39.28 51.3333Z" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-miterlimit="10" />
        </svg>
    )
}
export const TreeSaved = ({ isDark = false }: { isDark?: boolean }) => {
    return (
        <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.2301 23.4733H18.77C16.0167 23.4733 15.06 21.63 16.67 19.39L26.4 5.76333C27.5434 4.13 29.4567 4.13 30.5767 5.76333L40.3067 19.39C41.94 21.63 40.9834 23.4733 38.2301 23.4733Z" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M41.5433 42H15.48C11.7934 42 10.5334 39.55 12.7034 36.5633L22.0133 23.4733H35.01L44.32 36.5633C46.49 39.55 45.23 42 41.5433 42Z" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.5 51.3333V42" stroke={isDark ? "white" : "#505050"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const June = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.9666 27.92C44.5066 31.26 43.5666 34.84 40.7066 37.36C38.7266 39.18 36.1266 40.18 33.4266 40.16H11.2466C1.90663 39.48 1.88663 25.88 11.2466 25.2H11.3466C6.96663 12.94 18.3466 5.74001 26.9266 8.50001" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.6867 26.02C13.6467 25.5 12.5067 25.22 11.3467 25.2" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M44.1066 17C44.1066 19.2 43.0866 21.18 41.4666 22.46C40.2866 23.42 38.7466 24 37.1066 24C33.2466 24 30.1066 20.86 30.1066 17C30.1066 15.08 30.8866 13.34 32.1666 12.08V12.06C33.4266 10.78 35.1866 10 37.1066 10C40.9666 10 44.1066 13.14 44.1066 17Z" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const July = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5 37C31.6797 37 37.5 31.1797 37.5 24C37.5 16.8203 31.6797 11 24.5 11C17.3203 11 11.5 16.8203 11.5 24C11.5 31.1797 17.3203 37 24.5 37Z" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M38.78 38.28L38.52 38.02M38.52 9.98L38.78 9.72L38.52 9.98ZM10.22 38.28L10.48 38.02L10.22 38.28ZM24.5 4.16V4V4.16ZM24.5 44V43.84V44ZM4.66 24H4.5H4.66ZM44.5 24H44.34H44.5ZM10.48 9.98L10.22 9.72L10.48 9.98Z" stroke={isDark ? 'white' : '#686868'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const August = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.0534 40C36.7334 40.02 39.3134 39.02 41.2934 37.22C47.8334 31.5 44.3334 20.02 35.7134 18.94C32.6334 0.260004 5.69345 7.34 12.0734 25.12" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.3935 25.94C14.3335 25.4 13.1535 25.12 11.9735 25.14C2.65347 25.8 2.67347 39.36 11.9735 40.02" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M32.4734 19.78C33.5134 19.26 34.6334 18.98 35.7934 18.96" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.7734 40L16.7734 44" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.7734 40L24.7734 44" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.7734 32L24.7734 36" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.7734 32L16.7734 36" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const September = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.3866 40C36.0666 40.02 38.6466 39.02 40.6266 37.22C47.1666 31.5 43.6666 20.02 35.0466 18.94C31.9666 0.259989 5.02658 7.33999 11.4066 25.12" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.7266 25.94C13.6666 25.4 12.4866 25.12 11.3066 25.14C1.9866 25.8 2.0066 39.36 11.3066 40.02" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M31.8066 19.78C32.8466 19.26 33.9666 18.98 35.1266 18.96" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.6267 38.32H20.6267V42.98C20.6267 43.66 21.4867 44 21.9267 43.48L26.8267 37.9C27.4267 37.22 27.1667 36.66 26.2667 36.66H24.2667V32C24.2667 31.32 23.4067 30.98 22.9667 31.5L18.0667 37.08C17.4667 37.76 17.7267 38.32 18.6267 38.32Z" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const October = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 24C37.5 16.82 31.68 11 24.5 11C17.32 11 11.5 16.82 11.5 24" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.48 9.97998L10.22 9.71997M38.52 9.97998L38.78 9.71997L38.52 9.97998ZM24.5 4.15997V4V4.15997ZM4.66003 24H4.5H4.66003ZM44.5 24H44.34H44.5Z" stroke={isDark ? 'white' : '#686868'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.5 30H40.5" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.5 36H36.5" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.5 42H30.5" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const November = ({ isDark = false }: { isDark: boolean }) => {
    return (
        <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3736 26.02C14.3136 25.48 13.1336 25.2 11.9336 25.2C2.57357 25.86 2.57357 39.48 11.9336 40.14H34.1136C36.8136 40.16 39.4136 39.16 41.3936 37.34C47.9736 31.6 44.4536 20.06 35.7936 18.96C32.6736 0.220002 5.61357 7.34 12.0336 25.2" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M32.5334 19.84C33.5734 19.32 34.7134 19.04 35.8734 19.02" stroke={isDark ? 'white' : '#686868'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
export const PlantList = () => {
    return (
        <svg width="88" height="77" viewBox="0 0 88 77" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="88" height="77" rx="8" fill="white" />
            <mask id="mask0_435_1057" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="88" height="77">
                <path d="M0 8.55555C0 3.83045 4.37766 0 9.77778 0H78.2222C83.6223 0 88 3.83045 88 8.55556V68.4444C88 73.1695 83.6223 77 78.2222 77H9.77778C4.37766 77 0 73.1695 0 68.4444V8.55555Z" fill="#DEEDFF" />
            </mask>
            <g mask="url(#mask0_435_1057)">
                <path d="M78.8328 25H23.9235L8 50.4578H62.9093L78.8328 25Z" fill="#54969E" />
                <path d="M78.8328 25L62.9093 50.4578H8L8.76837 51.8374H63.6772L79.6009 26.3795L78.8328 25Z" fill="#295559" />
                <path d="M34.7556 37.0059L37.5814 32.4877L40.4072 27.9696H26.2075L20.5559 37.0059H34.7556Z" fill="#C8E8E2" />
                <path d="M19.6512 38.4523L13.999 47.4884H28.1987L31.0249 42.9704L33.8507 38.4523H19.6512Z" fill="#C8E8E2" />
                <path d="M42.2373 27.9696L36.5857 37.0059H51.6504L54.4762 32.4877L57.3022 27.9696H42.2373Z" fill="#C8E8E2" />
                <path d="M59.1322 27.9696L53.4803 37.0059H67.9501L73.6017 27.9696H59.1322Z" fill="#C8E8E2" />
                <path d="M76.3364 26.5232H60.0367H58.2066H43.142H41.312H25.2823L18.3398 37.6231L11.2644 48.9349H27.2941H29.1241H44.189H46.019H62.3191L69.7803 37.0058L76.3364 26.5232ZM45.0937 47.4885H30.0288L35.6808 38.4522H50.7457L45.0937 47.4885ZM28.1988 47.4885H13.9991L19.6511 38.4522H33.8508L31.0248 42.9704L28.1988 47.4885ZM40.4073 27.9696L37.5815 32.4878L34.7557 37.0059H20.556L26.2076 27.9696H40.4073ZM54.4761 32.4878L51.6503 37.0059H36.5855L42.2371 27.9696H57.3019L54.4761 32.4878ZM53.4804 37.0059L59.132 27.9696H73.6017L67.9501 37.0059H53.4804ZM49.7497 42.9705L52.5757 38.4524H67.0454L61.3938 47.4887H46.9239L49.7497 42.9705Z" fill="#EEFFFF" />
                <path d="M67.0453 38.4523H52.5756L49.7496 42.9704L46.9236 47.4884H61.3935L67.0453 38.4523Z" fill="#C8E8E2" />
                <path d="M35.681 38.4523L30.0288 47.4884H45.0937L50.7457 38.4523H35.681Z" fill="#C8E8E2" />
                <g opacity="0.63">
                    <path d="M38.9486 27.9696L41.6157 26.5232H41.3119H34.1106L31.4436 27.9696L23.5196 32.2672L20.7502 33.7692L18.3397 37.6231L16.8975 39.929L22.2873 37.0059L38.9486 27.9696Z" fill="white" />
                    <path d="M65.7162 38.4524L49.0549 47.4885L46.3878 48.935H53.8927H62.3189L66.6445 42.0191L69.7801 37.0059L70.497 35.8595L65.7162 38.4524Z" fill="white" />
                    <path d="M25.2573 38.4524L27.9243 37.0059L38.2625 31.3991L41.0319 29.897L44.5856 27.9697L47.2527 26.5232H44.7658L39.5389 29.358L25.4376 37.0059L22.7706 38.4524L18.0499 41.0126L15.2802 42.5147L14.0037 44.5557L16.7731 43.0537L25.2573 38.4524Z" fill="white" />
                    <path d="M37.8924 37.0059L54.5537 27.9696L57.2208 26.5232H55.6414L52.9744 27.9696L36.7256 36.7822L33.646 38.4524L16.9847 47.4885L14.3176 48.9349H15.897L18.5641 47.4885L33.1453 39.5804L37.8924 37.0059Z" fill="white" />
                    <path d="M49.455 37.0059L52.7775 35.2039L55.5469 33.7019L66.1163 27.9696L68.7833 26.5232H66.2965L63.6294 27.9696L56.8233 31.661L54.0539 33.163L46.9683 37.0059L44.3013 38.4524L31.2553 45.5277L28.4857 47.0297L27.6399 47.4885L24.9729 48.9349H27.2941H27.4596L30.1266 47.4885L46.7879 38.4524L49.455 37.0059Z" fill="white" />
                </g>
            </g>
        </svg>
    )
}
export const SmallCalendar = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33337 1.33333V3.33333" stroke="#009848" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.6666 1.33333V3.33333" stroke="#009848" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.33337 6.06H13.6667" stroke="#009848" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 5.66667V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V5.66667C2 3.66667 3 2.33333 5.33333 2.33333H10.6667C13 2.33333 14 3.66667 14 5.66667Z" stroke="#009848" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.99703 9.13334H8.00302" stroke="#009848" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.5295 9.13334H5.53549" stroke="#009848" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.5295 11.1333H5.53549" stroke="#009848" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export const CloudAndSun = ({ className }: { className?: string }) => {
    return (
        <svg width="64" height="35" viewBox="0 0 64 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g filter="url(#filter0_if_435_1352)">
                <ellipse cx="48.8009" cy="15.1612" rx="11.1991" ry="11.2879" fill="url(#paint0_radial_435_1352)" />
            </g>
            <g filter="url(#filter1_i_435_1352)">
                <ellipse cx="48.8009" cy="15.1612" rx="11.1991" ry="11.2879" fill="url(#paint1_radial_435_1352)" />
            </g>
            <g filter="url(#filter2_bi_435_1352)">
                <mask id="path-3-inside-1_435_1352" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M46.3573 34.6585H10.5384C10.5324 34.6585 10.5264 34.6586 10.5204 34.6586C10.5143 34.6586 10.5083 34.6585 10.5023 34.6585H10.4526V34.6583C4.67353 34.6216 0 29.8883 0 24.0547C0 18.1984 4.71012 13.4509 10.5204 13.4509C11.0953 13.4509 11.6594 13.4974 12.2093 13.5869C14.0749 6.3461 20.6036 1 28.3711 1C37.5925 1 45.068 8.53472 45.068 17.8293L46.3573 17.8293H46.4254V17.8295C51.0048 17.8664 54.7057 21.6195 54.7057 26.2439C54.7057 30.8683 51.0048 34.6214 46.4254 34.6583V34.6585H46.3573Z" />
                </mask>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M46.3573 34.6585H10.5384C10.5324 34.6585 10.5264 34.6586 10.5204 34.6586C10.5143 34.6586 10.5083 34.6585 10.5023 34.6585H10.4526V34.6583C4.67353 34.6216 0 29.8883 0 24.0547C0 18.1984 4.71012 13.4509 10.5204 13.4509C11.0953 13.4509 11.6594 13.4974 12.2093 13.5869C14.0749 6.3461 20.6036 1 28.3711 1C37.5925 1 45.068 8.53472 45.068 17.8293L46.3573 17.8293H46.4254V17.8295C51.0048 17.8664 54.7057 21.6195 54.7057 26.2439C54.7057 30.8683 51.0048 34.6214 46.4254 34.6583V34.6585H46.3573Z" fill="url(#paint2_linear_435_1352)" />
                <path d="M10.5384 34.6585V34.3327L10.5378 34.3327L10.5384 34.6585ZM10.5023 34.6585L10.5029 34.3327H10.5023V34.6585ZM10.4526 34.6585H10.1268V34.9843H10.4526V34.6585ZM10.4526 34.6583H10.7783V34.3346L10.4546 34.3325L10.4526 34.6583ZM12.2093 13.5869L12.157 13.9084L12.4506 13.9562L12.5248 13.6682L12.2093 13.5869ZM45.068 17.8293H44.7422V18.1551L45.068 18.1551L45.068 17.8293ZM46.3573 17.8293L46.3573 18.1551H46.3573V17.8293ZM46.4254 17.8293H46.7512V17.5035H46.4254V17.8293ZM46.4254 17.8295H46.0996V18.1527L46.4228 18.1553L46.4254 17.8295ZM46.4254 34.6583L46.4228 34.3325L46.0996 34.3351V34.6583H46.4254ZM46.4254 34.6585V34.9843H46.7512V34.6585H46.4254ZM46.3573 34.3327H10.5384V34.9843H46.3573V34.3327ZM10.5378 34.3327C10.532 34.3328 10.5262 34.3328 10.5204 34.3328V34.9843C10.5265 34.9843 10.5327 34.9843 10.539 34.9843L10.5378 34.3327ZM10.5204 34.3328C10.5145 34.3328 10.5087 34.3328 10.5029 34.3327L10.5017 34.9843C10.508 34.9843 10.5142 34.9843 10.5204 34.9843V34.3328ZM10.5023 34.3327H10.4526V34.9843H10.5023V34.3327ZM10.7783 34.6585V34.6583H10.1268V34.6585H10.7783ZM10.4546 34.3325C4.857 34.2969 0.325792 29.7114 0.325792 24.0547H-0.325792C-0.325792 30.0651 4.49005 34.9462 10.4505 34.9841L10.4546 34.3325ZM0.325792 24.0547C0.325792 18.3759 4.89248 13.7767 10.5204 13.7767V13.1251C4.52777 13.1251 -0.325792 18.0209 -0.325792 24.0547H0.325792ZM10.5204 13.7767C11.0777 13.7767 11.6244 13.8218 12.157 13.9084L12.2616 13.2653C11.6945 13.1731 11.1129 13.1251 10.5204 13.1251V13.7767ZM12.5248 13.6682C14.3547 6.56622 20.7574 1.32579 28.3711 1.32579V0.674208C20.4498 0.674208 13.7952 6.12598 11.8938 13.5056L12.5248 13.6682ZM28.3711 1.32579C37.4102 1.32579 44.7422 8.71222 44.7422 17.8293H45.3938C45.3938 8.35722 37.7749 0.674208 28.3711 0.674208V1.32579ZM45.068 18.1551L46.3573 18.1551L46.3573 17.5035L45.068 17.5035L45.068 18.1551ZM46.3573 18.1551H46.4254V17.5035H46.3573V18.1551ZM46.0996 17.8293V17.8295H46.7512V17.8293H46.0996ZM46.4228 18.1553C50.821 18.1907 54.38 21.7962 54.38 26.2439H55.0315C55.0315 21.4429 51.1885 17.5421 46.428 17.5038L46.4228 18.1553ZM54.38 26.2439C54.38 30.6916 50.821 34.2971 46.4228 34.3325L46.428 34.984C51.1885 34.9457 55.0315 31.0449 55.0315 26.2439H54.38ZM46.0996 34.6583V34.6585H46.7512V34.6583H46.0996ZM46.4254 34.3327H46.3573V34.9843H46.4254V34.3327Z" fill="url(#paint3_linear_435_1352)" mask="url(#path-3-inside-1_435_1352)" />
            </g>
            <defs>
                <filter id="filter0_if_435_1352" x="34.3439" y="0.615372" width="28.914" height="29.0917" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.651584" />
                    <feGaussianBlur stdDeviation="1.30317" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_435_1352" />
                    <feGaussianBlur stdDeviation="1.62896" result="effect2_foregroundBlur_435_1352" />
                </filter>
                <filter id="filter1_i_435_1352" x="37.6018" y="3.87329" width="22.3982" height="23.2274" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.651584" />
                    <feGaussianBlur stdDeviation="1.30317" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_435_1352" />
                </filter>
                <filter id="filter2_bi_435_1352" x="-3.25792" y="-2.25792" width="61.2216" height="40.1744" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.62896" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_435_1352" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_435_1352" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.651584" />
                    <feGaussianBlur stdDeviation="3.25792" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                    <feBlend mode="soft-light" in2="shape" result="effect2_innerShadow_435_1352" />
                </filter>
                <radialGradient id="paint0_radial_435_1352" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(51.0407 10.3638) rotate(113.554) scale(13.5453 19.8057)">
                    <stop stop-color="#FFB800" />
                    <stop offset="1" stop-color="#FF8A00" />
                </radialGradient>
                <radialGradient id="paint1_radial_435_1352" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(52.8054 9.75669) rotate(118.254) scale(11.1837 16.3694)">
                    <stop offset="0.159835" stop-color="#FFB800" />
                    <stop offset="0.828764" stop-color="#FF8A00" />
                </radialGradient>
                <linearGradient id="paint2_linear_435_1352" x1="20.9728" y1="37.9423" x2="31.9105" y2="12.0759" gradientUnits="userSpaceOnUse">
                    <stop offset="0.203704" stop-color="#9EC4FD" stop-opacity="0.1" />
                    <stop offset="1" stop-color="white" stop-opacity="0.7" />
                </linearGradient>
                <linearGradient id="paint3_linear_435_1352" x1="46.6968" y1="4.69423" x2="30.7991" y2="24.2741" gradientUnits="userSpaceOnUse">
                    <stop offset="0.448654" stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export const DownArrow = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5999 7.45834L11.1666 12.8917C10.5249 13.5333 9.4749 13.5333 8.83324 12.8917L3.3999 7.45834" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>


    )
}

export const Darklogo = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="185" height="53" viewBox="0 0 185 53" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M40.6816 30.1553V43.9019H33.6976V31.2259C33.6976 27.3448 31.9492 25.5574 29.1302 25.5574C25.9946 25.5574 23.8027 27.5658 23.8027 31.8512V43.9019H16.8187V31.2259C16.8187 27.3448 15.1622 25.5574 12.2514 25.5574C9.16319 25.5574 6.9682 27.5658 6.9682 31.8512V43.9019H0V19.9015H6.65463V22.6584C8.44736 20.6057 11.1333 19.5351 14.2215 19.5351C17.5789 19.5351 20.4453 20.8299 22.1399 23.4636C24.0656 21.0067 27.2077 19.5351 30.8248 19.5351C36.5546 19.5351 40.6753 22.8384 40.6753 30.1585" fill="white" />
            <path d="M43.0065 12.6571C43.0065 10.4686 44.7517 8.77282 47.349 8.77282C49.9462 8.77282 51.6946 10.3802 51.6946 12.5245C51.6946 14.8456 49.9494 16.5414 47.3521 16.5414C44.7549 16.5414 43.0097 14.8456 43.0097 12.6571M43.8585 19.8888H50.8457V43.8893H43.8554L43.8585 19.8888Z" fill="white" />
            <path d="M66.9992 28.5511H54.3298V34.1312H66.9992V28.5511Z" fill="white" />
            <path d="M184.052 3.65692C183.419 2.54855 182.503 1.62667 181.397 0.984535C180.291 0.342396 179.035 0.00276737 177.756 1.79432e-07H103.133C99.248 -0.000491055 95.4303 1.00767 92.0552 2.92524C88.6802 4.84281 85.8642 7.60367 83.8845 10.936L78.9339 19.2857C80.3637 18.9469 81.829 18.7805 83.2985 18.7898C86.6116 18.7898 90.2826 19.5509 92.5662 20.8899L90.2382 25.8447C88.1227 24.6513 85.7291 24.0348 83.2985 24.0573C80.1628 24.0573 78.8199 25.0394 78.8199 26.29C78.8199 30.3953 93.3739 26.4258 93.3739 35.887C93.3739 40.3524 89.2088 43.523 81.9999 43.523C77.9267 43.523 73.8059 42.4051 71.5698 40.9303L73.8883 35.9218C76.0358 37.305 79.3045 38.2429 82.2596 38.2429C85.484 38.2429 86.694 37.3934 86.694 36.0544C86.694 32.628 75.6082 35.246 72.7956 29.5964L65.3998 42.0482C64.7435 43.1486 64.3912 44.4026 64.3789 45.6828C64.3666 46.963 64.6945 48.2236 65.3295 49.3363C65.9644 50.4491 66.8837 51.3743 67.9937 52.0178C69.1037 52.6613 70.3649 53.0002 71.649 53H146.294C149.951 52.9941 153.55 52.0942 156.776 50.3792C160.003 48.6642 162.758 46.1864 164.801 43.163H164.136V40.1724C162.837 42.3608 160.335 43.523 156.794 43.523C151.153 43.523 147.796 40.3966 147.796 36.2439C147.796 32.0059 150.795 29.0595 158.137 29.0595H163.693C163.693 26.0689 161.9 24.3226 158.14 24.3226C155.587 24.3226 152.946 25.1721 151.2 26.5553L148.692 21.6889C151.334 19.8162 155.229 18.7898 159.081 18.7898C166.423 18.7898 170.677 22.1815 170.677 29.4574V33.3543L183.98 10.9328C184.635 9.83446 184.987 8.58265 185 7.30467C185.012 6.0267 184.686 4.76813 184.052 3.65692ZM118.567 43.163H111.941V40.3208C110.107 42.4177 107.418 43.5325 104.466 43.5325C98.4195 43.5325 94.1658 40.1408 94.1658 32.7322V19.153H101.153V31.6964C101.153 35.7133 102.943 37.4976 106.034 37.4976C109.255 37.4976 111.583 35.4449 111.583 31.0269V19.153H118.567V43.163ZM136.384 25.2194C135.804 25.1752 135.354 25.131 134.819 25.131C130.967 25.131 128.414 27.2279 128.414 31.8259V43.163H121.43V19.1625H128.104V22.3204C129.802 19.9993 132.668 18.7962 136.384 18.7962V25.2194ZM144.98 43.163H138.012V19.1625H144.98V43.163ZM141.496 15.7993C138.898 15.7993 137.153 14.1066 137.153 11.9181C137.153 9.72967 138.898 8.03384 141.496 8.03384C144.093 8.03384 145.838 9.64124 145.838 11.7823C145.829 14.1066 144.083 15.7993 141.486 15.7993H141.496Z" fill="#009848" />
            <path d="M163.74 35.6881V33.2343H158.948C155.679 33.2343 154.65 34.4375 154.65 36.0449C154.65 37.7881 156.129 38.9471 158.59 38.9471C160.918 38.9471 162.932 37.8765 163.74 35.6881Z" fill="#009848" />
        </svg>

    )
}
export const LightLogo = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="185" height="53" viewBox="0 0 185 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.6816 30.1553V43.9019H33.6976V31.2259C33.6976 27.3448 31.9492 25.5574 29.1302 25.5574C25.9946 25.5574 23.8027 27.5658 23.8027 31.8512V43.9019H16.8187V31.2259C16.8187 27.3448 15.1622 25.5574 12.2514 25.5574C9.16319 25.5574 6.9682 27.5658 6.9682 31.8512V43.9019H0V19.9015H6.65463V22.6584C8.44736 20.6057 11.1333 19.5351 14.2215 19.5351C17.5789 19.5351 20.4453 20.8299 22.1399 23.4636C24.0656 21.0067 27.2077 19.5351 30.8248 19.5351C36.5546 19.5351 40.6753 22.8384 40.6753 30.1585" fill="#545554" />
            <path d="M43.0065 12.6571C43.0065 10.4686 44.7517 8.77282 47.349 8.77282C49.9462 8.77282 51.6946 10.3802 51.6946 12.5245C51.6946 14.8456 49.9494 16.5414 47.3521 16.5414C44.7549 16.5414 43.0097 14.8456 43.0097 12.6571M43.8585 19.8888H50.8457V43.8893H43.8554L43.8585 19.8888Z" fill="#545554" />
            <path d="M66.9992 28.5511H54.3298V34.1312H66.9992V28.5511Z" fill="#545554" />
            <path d="M184.052 3.65692C183.419 2.54855 182.503 1.62667 181.397 0.984535C180.291 0.342396 179.035 0.00276737 177.756 1.79432e-07H103.133C99.248 -0.000491055 95.4303 1.00767 92.0552 2.92524C88.6802 4.84281 85.8642 7.60367 83.8845 10.936L78.9339 19.2857C80.3637 18.9469 81.829 18.7805 83.2985 18.7898C86.6116 18.7898 90.2826 19.5509 92.5662 20.8899L90.2382 25.8447C88.1227 24.6513 85.7291 24.0348 83.2985 24.0573C80.1628 24.0573 78.8199 25.0394 78.8199 26.29C78.8199 30.3953 93.3739 26.4258 93.3739 35.887C93.3739 40.3524 89.2088 43.523 81.9999 43.523C77.9267 43.523 73.8059 42.4051 71.5698 40.9303L73.8883 35.9218C76.0358 37.305 79.3045 38.2429 82.2596 38.2429C85.484 38.2429 86.694 37.3934 86.694 36.0544C86.694 32.628 75.6082 35.246 72.7956 29.5964L65.3998 42.0482C64.7435 43.1486 64.3912 44.4026 64.3789 45.6828C64.3666 46.963 64.6945 48.2236 65.3295 49.3363C65.9644 50.4491 66.8837 51.3743 67.9937 52.0178C69.1037 52.6613 70.3649 53.0002 71.649 53H146.294C149.951 52.9941 153.55 52.0942 156.776 50.3792C160.003 48.6642 162.758 46.1864 164.801 43.163H164.136V40.1724C162.837 42.3608 160.335 43.523 156.794 43.523C151.153 43.523 147.796 40.3966 147.796 36.2439C147.796 32.0059 150.795 29.0595 158.137 29.0595H163.693C163.693 26.0689 161.9 24.3226 158.14 24.3226C155.587 24.3226 152.946 25.1721 151.2 26.5553L148.692 21.6889C151.334 19.8162 155.229 18.7898 159.081 18.7898C166.423 18.7898 170.677 22.1815 170.677 29.4574V33.3543L183.98 10.9328C184.635 9.83446 184.987 8.58265 185 7.30467C185.012 6.0267 184.686 4.76813 184.052 3.65692ZM118.567 43.163H111.941V40.3208C110.107 42.4177 107.418 43.5325 104.466 43.5325C98.4195 43.5325 94.1658 40.1408 94.1658 32.7322V19.153H101.153V31.6964C101.153 35.7133 102.943 37.4976 106.034 37.4976C109.255 37.4976 111.583 35.4449 111.583 31.0269V19.153H118.567V43.163ZM136.384 25.2194C135.804 25.1752 135.354 25.131 134.819 25.131C130.967 25.131 128.414 27.2279 128.414 31.8259V43.163H121.43V19.1625H128.104V22.3204C129.802 19.9993 132.668 18.7962 136.384 18.7962V25.2194ZM144.98 43.163H138.012V19.1625H144.98V43.163ZM141.496 15.7993C138.898 15.7993 137.153 14.1066 137.153 11.9181C137.153 9.72967 138.898 8.03384 141.496 8.03384C144.093 8.03384 145.838 9.64124 145.838 11.7823C145.829 14.1066 144.083 15.7993 141.486 15.7993H141.496Z" fill="#009848" />
            <path d="M163.74 35.6881V33.2343H158.948C155.679 33.2343 154.65 34.4375 154.65 36.0449C154.65 37.7881 156.129 38.9471 158.59 38.9471C160.918 38.9471 162.932 37.8765 163.74 35.6881Z" fill="#009848" />
        </svg>
    )
}

export const SidebarMaintenanceIcon = () => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3332 18.3335H1.6665C1.32484 18.3335 1.0415 18.0502 1.0415 17.7085C1.0415 17.3668 1.32484 17.0835 1.6665 17.0835H18.3332C18.6748 17.0835 18.9582 17.3668 18.9582 17.7085C18.9582 18.0502 18.6748 18.3335 18.3332 18.3335Z" fill="white" />
        <path d="M8.125 3.33317V18.3332H11.875V3.33317C11.875 2.4165 11.5 1.6665 10.375 1.6665H9.625C8.5 1.6665 8.125 2.4165 8.125 3.33317Z" fill="white" />
        <path d="M2.5 8.33317V18.3332H5.83333V8.33317C5.83333 7.4165 5.5 6.6665 4.5 6.6665H3.83333C2.83333 6.6665 2.5 7.4165 2.5 8.33317Z" fill="white" />
        <path d="M14.1665 12.5002V18.3335H17.4998V12.5002C17.4998 11.5835 17.1665 10.8335 16.1665 10.8335H15.4998C14.4998 10.8335 14.1665 11.5835 14.1665 12.5002Z" fill="white" />
    </svg>
    )
}

export const SunOnly = () => {
    return (
        <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_if_562_1123)">
                <circle cx="36.4976" cy="36.4878" r="16.4976" fill="url(#paint0_radial_562_1123)" />
            </g>
            <g filter="url(#filter1_i_562_1123)">
                <circle cx="36.4976" cy="36.4878" r="16.4976" fill="url(#paint1_radial_562_1123)" />
            </g>
            <defs>
                <filter id="filter0_if_562_1123" x="0" y="-0.00976562" width="72.9951" height="72.9951" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_562_1123" />
                    <feGaussianBlur stdDeviation="10" result="effect2_foregroundBlur_562_1123" />
                </filter>
                <filter id="filter1_i_562_1123" x="20" y="19.9902" width="32.9951" height="36.9951" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_562_1123" />
                </filter>
                <radialGradient id="paint0_radial_562_1123" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.7971 29.4763) rotate(113.72) scale(19.8219 29.1391)">
                    <stop stop-color="#FFB800" />
                    <stop offset="1" stop-color="#FF8A00" />
                </radialGradient>
                <radialGradient id="paint1_radial_562_1123" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42.3967 28.589) rotate(118.443) scale(16.3744 24.0711)">
                    <stop offset="0.159835" stop-color="#FFB800" />
                    <stop offset="0.828764" stop-color="#FF8A00" />
                </radialGradient>
            </defs>
        </svg>
    )
}

export const ConnectionIcon = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3933 3.32373H10.1666V1.32373C10.1666 1.0504 9.93992 0.82373 9.66659 0.82373C9.39325 0.82373 9.16659 1.0504 9.16659 1.32373V3.32373H6.83325V1.32373C6.83325 1.0504 6.60659 0.82373 6.33325 0.82373C6.05992 0.82373 5.83325 1.0504 5.83325 1.32373V3.32373H5.60659C4.90659 3.32373 4.33325 3.89706 4.33325 4.59706V7.9904C4.33325 9.45706 5.33325 10.6571 6.99992 10.6571H7.49992V14.6571C7.49992 14.9304 7.72659 15.1571 7.99992 15.1571C8.27325 15.1571 8.49992 14.9304 8.49992 14.6571V10.6571H8.99992C10.6666 10.6571 11.6666 9.45706 11.6666 7.9904V4.59706C11.6666 3.89706 11.0933 3.32373 10.3933 3.32373Z" fill="#058DF7" />
        </svg>

    )
}