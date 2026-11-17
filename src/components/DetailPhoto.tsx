'use client';

import { useEffect, useId, useRef } from 'react';
import styles from './RideHeight.module.css';

const details = {
  suspensao: {
    width: 788,
    height: 1400,
    path: 'M155 881 C233 894 395 900 516 895 C567 889 627 868 665 837',
  },
  escapamento: {
    width: 900,
    height: 1600,
    path: 'M192 1183 C193 1158 235 1156 236 1181 C237 1206 193 1210 192 1183 Z M677 1181 C679 1154 716 1154 721 1180 C725 1208 680 1216 677 1181 Z',
  },
  rodas: {
    width: 788,
    height: 1400,
    path: 'M377 740 C380 705 400 682 423 683 C448 684 458 713 454 744 C450 777 433 798 410 798 C385 797 374 772 377 740 Z M675 651 C677 627 690 611 703 614 C717 618 721 637 718 656 C715 679 704 692 691 690 C678 688 672 673 675 651 Z',
  },
  'front-lip': {
    width: 790,
    height: 1400,
    path: 'M220 967 C235 992 249 1009 283 1014 C368 1021 455 1013 536 997 C608 983 664 955 690 930',
  },
  aerofolio: {
    width: 1100,
    height: 1429,
    path: 'M486 802 C520 814 549 813 582 798 C659 775 764 771 850 770 C918 767 981 765 995 783',
  },
};

// Trace the body panels around the two visible wheel arches in suspensao.webp.
const suspensionBody = `
  M153 849 L154 838 C149 824 147 805 151 793
  Q155 784 163 778 Q167 755 178 740 Q208 714 257 692
  Q247 689 249 682 Q252 673 269 670
  L323 619 Q343 598 379 597 Q449 592 520 594
  Q562 592 584 607 Q617 632 640 659
  Q656 671 663 690 L668 714 Q675 729 674 745
  L667 757 Q665 735 660 730 Q654 723 649 735
  Q642 750 642 791 L635 806 L556 845
  Q564 785 550 761 Q540 747 531 762
  Q522 775 518 822 L517 843 L523 857
  Q507 866 457 867 L240 868 Q190 868 161 860 Q152 859 153 849 Z
`;

export type HighlightedPart = keyof typeof details;

export function DetailPhoto({ part, src, label, raised }: {
  part: HighlightedPart;
  src: string;
  label: string;
  raised?: boolean;
}) {
  const photo = useRef<SVGSVGElement>(null);
  const bodyClipId = useId();
  const { width, height, path } = details[part];

  useEffect(() => {
    const element = photo.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.highlighted = String(entry.intersectionRatio >= 0.45);
    }, { threshold: 0.45 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);


  return (
    <svg
      ref={photo}
      className="detail-photo"
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={part === 'escapamento' ? 'xMidYMax slice' : 'xMidYMid slice'}
    >
      <image href={src} width={width} height={height} />
      {raised !== undefined && (
        <>
          <defs>
            <clipPath id={bodyClipId}>
              <path d={suspensionBody} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${bodyClipId})`}>
            <path d="M143 820 L523 830 L556 814 L641 782 L675 740 V881 H143 Z" fill="#111416" />
          </g>
          <g className={styles.body} data-raised={raised}>
            <image href={src} width={width} height={height} clipPath={`url(#${bodyClipId})`} />
          </g>
        </>
      )}
      {!raised && <path className="detail-photo-line" d={path} pathLength="1" aria-hidden="true" />}
    </svg>
  );
}
