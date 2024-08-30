import type { Metric, ReportOpts } from 'web-vitals';

const reportWebVitals = (
  onReport?: (metric: Metric) => void,
  opts?: ReportOpts,
) => {
  if (onReport && onReport instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onReport, opts);
      onINP(onReport, opts);
      onFCP(onReport, opts);
      onLCP(onReport, opts);
      onTTFB(onReport, opts);
    });
  }
};

export default reportWebVitals;
