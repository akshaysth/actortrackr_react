# UI/UX Bugs

## Critical (broken functionality)

1. **Form submit buttons have no `onSubmit` handler** — `Reports/create.tsx:13,30` and `Ttps/create.tsx:13,43` — clicking submit triggers a full page reload instead of saving data.

2. **Navigation links use `<a href="#">` instead of `<Link>`** — `Reports/list.tsx:66,69` and `Ttps/index.tsx:55,58` — causes full page reload, breaks SPA navigation.

3. **Layout nav items always show "Home" as active** — `Layout/index.tsx:14-19` — `current: true` is hardcoded on Home, never updates based on route.

4. **Layout user menu links all point to `#`** — `Layout/index.tsx:22-26` — Profile, Settings, Sign out all reload the page.

5. **Notification bell buttons have no `onClick` handler** — `Layout/index.tsx:71-75,173-177` — buttons are styled as clickable but do nothing.

6. **TTP list uses hardcoded mock data instead of API fetch** — `Ttps/index.tsx:11-13` and `Ttps/view.tsx:6-13` — `ttpId` from URL params is never used to look up real data.

---

## High (broken/invisible UI)

7. **`text-md` is not a valid Tailwind class** — `Reports/list.tsx:30` and `Ttps/index.tsx:19` — silently ignored, text has no explicit size. Replace with `text-base`.

8. **`className` not merged when spreading props** — `Button.tsx:13`, `Card.tsx:12`, `Input.tsx:9` — parent `className` props are lost due to Tailwind JIT. Use `clsx` + `tailwind-merge`.

9. **No error handling on `fetch` in Reports list** — `Reports/list.tsx:21-25` — network failure crashes the component silently.

10. **`<hr className="bg-indigo-400">` doesn't color the line** — `Ttps/view.tsx:97` — use `border-t-indigo-400` instead.

11. **Table has no horizontal scroll wrapper** — `Reports/list.tsx:42` and `Ttps/index.tsx:31` — tables overflow on small screens and break layout.

12. **Title shows "Report: undefined"** — `Reports/report.tsx:7` and `Ttps/view.tsx:17` — if route param is missing, title literally reads "undefined".

---

## Medium (usability/accessibility)

13. **Icon action buttons missing `aria-label`** — `Reports/list.tsx:60-71` and `Ttps/index.tsx:49-60` — screen readers announce empty links.

14. **No empty state handling on tables** — `Reports/list.tsx:42-76` and `Ttps/index.tsx:31-65` — empty data renders a header-only table that looks broken.

15. **TTP Description uses single-line input** — `Ttps/create.tsx:37` — should be a `<textarea>`.

16. **CreateActor redirects to `/` after success** — `Actors/create.tsx:25` — should go to `/actors` list.

17. **Relative route link in TTP list** — `Ttps/index.tsx:50` — `to={report.id.toString()}` creates relative URL `"1"` instead of `/ttps/1`.

18. **Inputs lack proper label association** — `Input.tsx:1-15` — no `label` prop, no error state styling, no `htmlFor` support.

19. **Error messages use inline styles** — `Actors/list.tsx:29` and `Actors/create.tsx:55` — `style={{ color: "red" }}` instead of `className="text-red-600"`.

20. **No async cleanup in `useEffect`** — `Actors/list.tsx`, `Actors/create.tsx`, `Reports/list.tsx` — setState on unmounted component causes memory leak warnings.

21. **`justify-between` with single child** — `Actors/list.tsx:33` — has no visual effect, should be `justify-end`.

---

## Low (dead code / consistency)

22. **Dead/unused component files** — `ActorList.tsx`, `forms/ActorForm/index.tsx`, `Reports/reports.tsx`, `data/reports.ts` — not imported anywhere.

23. **Empty `<div className="container"></div>`** — `Homepage/index.tsx:6`, `Actors/index.tsx:6`, `Reports/report.tsx:12`, `Reports/view.tsx:8` — renders nothing.

24. **CreateActor uses raw HTML inputs** — `Actors/create.tsx:43-54` — inconsistent with Report/TTP create pages that use custom `Input`/`Button` components.

25. **Reports list "view" link goes to wrong route** — `Reports/list.tsx:61` — relative URL `report.id.toString()` resolves to `/reports/1` (view route), not an edit route.

---

## Task List

- [x] #1 Form submit buttons have no `onSubmit` handler
- [x] #2 Navigation links use `<a href="#">` instead of `<Link>`
- [x] #3 Layout nav items always show "Home" as active
- [x] #4 Layout user menu links all point to `#`
- [x] #5 Notification bell buttons have no `onClick` handler
- [x] #6 TTP list uses hardcoded mock data instead of API fetch
- [x] #7 `text-md` is not a valid Tailwind class
- [x] #8 `className` not merged when spreading props
- [x] #9 No error handling on `fetch` in Reports list
- [x] #10 `<hr className="bg-indigo-400">` doesn't color the line
- [x] #11 Table has no horizontal scroll wrapper
- [x] #12 Title shows "Report: undefined"
- [x] #13 Icon action buttons missing `aria-label`
- [x] #14 No empty state handling on tables
- [x] #15 TTP Description uses single-line input
- [x] #16 CreateActor redirects to `/` after success
- [x] #17 Relative route link in TTP list
- [x] #18 Inputs lack proper label association
- [x] #19 Error messages use inline styles
- [x] #20 No async cleanup in `useEffect`
- [x] #21 `justify-between` with single child
- [x] #22 Dead/unused component files
- [x] #23 Empty `<div className="container"></div>`
- [x] #24 CreateActor uses raw HTML inputs
- [x] #25 Reports list "view" link goes to wrong route
