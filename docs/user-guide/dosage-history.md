---
title: Dosage History
layout: default
parent: User Guide
nav_order: 6
---

# Dosage History
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Dosage History page (`/dashboard/dosage-history`) provides a detailed view of all dose events recorded by your devices. You can filter by date range, view trends in a chart, browse the log table, and export records to CSV.

---

## Date Range Filter

By default, the page shows the **last 30 days**. Use the date range picker in the top-right to select any custom start and end date.

- Changing the date range automatically reloads all data (chart + table + summary cards).
- The page number resets to 1 whenever the date range changes.

---

## Summary Cards

Three cards appear below the date range picker:

| Card | What it shows |
|---|---|
| **Total Doses** | Total number of dose events in the selected date range |
| **Successful** | Number of events with `status_log = 'Success'` |
| **Other / Failed** | Dose events with any other status — these may need attention |

---

## Adherence Overview Chart

A bar chart shows daily dose counts broken down by **Successful** (blue) and **Other/Failed** (amber) for every day in the selected date range. Days with no events show as empty bars.

The date range label is shown in the chart header. If the selected range is long (e.g. 30 days), the chart will show 30 bars — scroll or zoom your browser if needed.

---

## Dosage Log Table

Below the chart is a paginated table of individual dose records:

| Column | Description |
|---|---|
| **Date & Time** | Date (e.g. `Jun 18, 2025`) and time (e.g. `2:34 PM`) of the dose |
| **Status** | Colour-coded badge — green for `Success`, amber for anything else |
| **Duration** | Time in seconds between `dosage_start_time` and `dosage_end_time`. Shows `—` if end time was not recorded |
| **Device** | First 8 characters of the device UUID, followed by `...` |

### Pagination

- The table shows **20 records per page**.
- Use the ← → buttons at the bottom to navigate pages.
- The header shows "Showing X of Y records" to indicate your position.

---

## Exporting to CSV

Click the **Export** button (next to the date range picker) to download a CSV file of the records **currently shown on the table** (the current page of up to 20 records).

> **Important:** The export only includes records on the **current page**, not all records across all pages. If you need a full dataset export, use page navigation to export each page separately, or contact your administrator for a database-level export.

The exported CSV filename includes the selected date range, for example:
```
dosage-history-2025-05-19-2025-06-18.csv
```

The CSV columns are: `Date/Time`, `Status`, `Duration`, `Device ID`.

The Export button is disabled (greyed out) when there are no records to export.

---

## No Records State

If no dose events exist in the selected date range, the table shows:

> *"No Records Found. Try adjusting the date range to find dosage records."*

If your account has no linked devices at all, no data fetch is performed and the page will remain empty.
