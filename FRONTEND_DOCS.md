# Vult Frontend — Developer Documentation

> **Purpose**: This document serves as the definitive reference for AI agents and developers working on the Vult Angular frontend. Read this first before making any changes.

---

## 1. 🏗️ Tech Stack

| Layer         | Technology                                                          |
| ------------- | ------------------------------------------------------------------- |
| Framework     | **Angular 19** (standalone + module hybrid)                         |
| UI Library    | **NG-ZORRO** (Ant Design for Angular) v19                           |
| Styling       | **Bootstrap 5** with heavy customization                            |
| Icons         | **Boxicons** (`bx`/`bxs`/`bxl` classes) + ISAX icons (`isax` class) |
| Forms         | **Reactive Forms** + `FormSharedModule`                             |
| Select        | **@ng-select/ng-select** (`<ng-select>`)                            |
| i18n          | **@ngx-translate/core** (`'KEY' \| translate`)                      |
| Carousel      | **ngx-owl-carousel-o** (`<owl-carousel-o>`)                         |
| Maps          | **Leaflet** (`<mg-map-selector>`)                                   |
| Calendar      | **FullCalendar**                                                    |
| QR Code       | **angularx-qrcode** + ng-qrcode                                     |
| Charts        | **ApexCharts** (`ng-apexcharts`), **Chartist**, **ECharts**         |
| Image Upload  | **ngx-dropzone**                                                    |
| Editör        | **CKEditor 5**                                                      |
| Notifications | **Sweetalert2** (SWAL helper in `app-const.ts`)                     |

---

## 2. 🎨 Styling System — NO Per-Component SCSS

All styling is done via **Bootstrap utility classes** and the **custom theme utilities**.

**🚫 DO NOT create per-component SCSS files** (e.g., `register.component.scss`). If absolutely necessary, add styles to the **existing global SCSS files** in `assets/scss/`.

### 2.0. Where to Put Custom SCSS

If you need custom CSS that can't be achieved with utility classes alone, add it to one of these **existing global SCSS files** (they are already imported in `app.scss`):

| File                                           | Purpose                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/scss/_custom.scss`                     | **Main file for ALL custom styles** — already contains `.mo-gradient`, `.btn-primary-gradient`, `.btn-white`, `.btn-soft-*`, `.bg-glass`, `.mo-card`, `.hovering-light`, `.custom_checkbox`, `.custom_radio`, `.chat-bubble`, `.package-card`, `.otp-container`, `.activity-card`, `.session-count-card`, `.btn-chat`, `.chat-item`, `.circle-checkbox`, and many more |
| `assets/scss/_home.scss`                       | Home/landing page styles                                                                                                                                                                                                                                                                                                                                               |
| `assets/scss/_banner.scss`                     | Banner-specific styles                                                                                                                                                                                                                                                                                                                                                 |
| `assets/scss/custom/components/forms.scss`     | Form-specific overrides                                                                                                                                                                                                                                                                                                                                                |
| `assets/scss/custom/components/helper.scss`    | Helper classes                                                                                                                                                                                                                                                                                                                                                         |
| `assets/scss/custom/pages/authentication.scss` | Auth page styles                                                                                                                                                                                                                                                                                                                                                       |
| `assets/scss/custom/structure/general.scss`    | General layout/structure                                                                                                                                                                                                                                                                                                                                               |

> **Before writing new CSS**, search `_custom.scss` first — the class you need may already exist (e.g., `btn-icon`, `btn-primary-gradient`, `bg-outline-primary`, `btn-soft-danger`, `bg-glass`, `mo-card`, `.hovering-light`, `.custom_checkbox`, etc.)

### 2.1. Bootstrap Bootstrap Layers (in order)

```
functions → _grid-breakpoints → variables → _variables (custom) →
maps → utilities → _custom-utils → mixins → bootstrap →
_custom-functions → custom structure/components/plugins/pages
```

### 2.2. Primary Colors

| Variable     | Value               | Usage            |
| ------------ | ------------------- | ---------------- |
| `$primary`   | `#4f7cff` (green)   | Main brand color |
| `$secondary` | `#49B6FF` (orange)  | Secondary/accent |
| `$info`      | `#49B6FF` (blue)    | Info elements    |
| `$danger`    | `#F31260`           | Errors/deletes   |
| `$warning`   | `#F5A524`           | Warnings         |
| `$success`   | `#17C964`           | Success states   |
| `$dark`      | `#121826`           | Dark bg          |
| `$body-bg`   | `$f3f4f6` (#f3f4f6) | Page background  |

### 2.3. Custom Utility Classes Available

These are available globally without any import:

**Font Sizes** (`fs-{size}`): `inherit`, `1`-`6`, `0_75rem`, `0_875rem`, `1_125rem`, `1_25rem`, `1_6rem`, `8px`-`60px`

**Font Weights** (`fw-{weight}`): `light`, `lighter`, `normal`, `medium`, `semibold`, `bold`, `bolder`

**Background Outline Variants** (`bg-outline-{color}`): All theme colors — gives 20% opacity background with full color text. e.g., `bg-outline-primary`

**Button Soft Variants** (`btn-soft-{color}`): All theme colors — soft background button. e.g., `btn-soft-danger`

**Badge Variants** (`badge-{color}`): All theme colors.

**Width/Height Utilities** extended with pixel values:

- `h-5px`, `h-10px`, `h-40px`, `h-50px`, `h-60px`, `h-70px`, `h-80px`, `h-100px`, `h-200px`, `h-300px`, `h-400px`, `h-500px`
- `w-5px`, `w-10px`, `w-40px`, `w-50px`, `w-100px`, `w-150px`, `w-200px`, `w-300px`, `w-400px`, `w-500px`, `w-800px`
- `w-fit-content`, `w-auto`
- `min-h-{value}`, `min-w-{value}`

**Max Width**: `max-w-100`, `max-w-300px`, `max-w-400px`, `max-w-500px`, `max-w-600px`, `max-w-800px`, `max-w-1128px`, `max-w-1440px`

**Border Radius** (`rounded-{value}`): `null`, `0`, `1`, `2`, `3`, `4`, `5`, `circle`, `pill`, `2px`, `6px`

**Grid**: `grid-columns-{value}` (auto, 1fr, fr-fr, fr-fr-fr, cols-2 through cols-8), `grid-col-{1-7}`, `grid-col-full`

**Z-index**: `z-{2|3|4|5|10|50|500|1000}`

**Position values**: `top/bottom-{0|10px|15px|20px|30px|40px|5px|minus-5px|50|100}`

### 2.4. Common Utility Patterns

```html
<!-- Buttons -->
<button class="btn btn-primary-gradient fw-medium h-50px">...</button>
<button class="btn btn-soft-danger fs-1_25rem">...</button>
<button class="btn btn-white w-100 fw-bold h-40px">...</button>

<!-- Cards -->
<div class="card shadow-none rounded-3 border">
  <div class="card-body">...</div>
</div>

<!-- Cards with gradient (auth pages) -->
<div class="card shadow-none border-0 mo-gradient h-100 rounded-0">
  <div class="overlay"></div>
  <div class="card-body">...</div>
</div>

<!-- Flex helpers -->
<div class="d-flex align-items-center justify-content-between gap-2">...</div>
<div class="d-flex flex-wrap gap-2">...</div>

<!-- Text colors -->
<p class="text-gray-600">...</p>
<p class="text-white opacity-75">...</p>
<span class="text-muted">...</span>

<!-- Rounded -->
<div class="border rounded-2 cursor-pointer">...</div>
<div class="border rounded-3">...</div>
```

---

## 3. 📐 Layout & Form Patterns

### 3.1. Two-Column Form Layout

Use the `row custom_form` class on `<nz-form>` with Bootstrap grid:

```html
<nz-form class="row custom_form g-3 row-cols-1 row-cols-md-2" [formGroup]="form">
  <!-- Full width -->
  <nz-form-item class="w-100">...</nz-form-item>

  <!-- Section header -->
  <p class="fs-1_25rem fw-medium my-3 w-100">Section Title</p>

  <!-- Half width (2 per row) — default without class -->
  <nz-form-item>...</nz-form-item>
  <nz-form-item>...</nz-form-item>
</nz-form>
```

### 3.2. Standard Form Field Pattern

```html
<nz-form-item>
  <nz-form-label [nzRequired]="form | isRequired: 'fieldName'"> {{ 'TRANSLATION.KEY' | translate }} </nz-form-label>
  <nz-form-control [nzErrorTip]="nzErrorTip">
    <input formControlName="fieldName" nz-input class="h-50px" nzSize="large" placeholder="{{ 'TRANSLATION.PLACEHOLDER' | translate }}" />
  </nz-form-control>
</nz-form-item>
```

### 3.3. Number Input (nz-input-number)

Use `<nz-input-number>` for number fields to prevent letters and show proper validation:

```html
<nz-form-item>
  <nz-form-label [nzRequired]="form | isRequired: 'branchesCount'">
    عدد الفروع
  </nz-form-label>
  <nz-form-control [nzErrorTip]="nzErrorTip>
    <nz-input-number
      formControlName="branchesCount"
      [nzMin]="1"
      [nzStep]="1"
      [nzPrecision]="0"
      class="w-100 bg-transparent h-50px"
      nzSize="large"
      [nzPlaceHolder]="'أدخل عدد الفروع'"
    ></nz-input-number>
  </nz-form-control>
</nz-form-item>
```

Requires `NzInputNumberModule` import from `ng-zorro-antd/input-number`.

### 3.4. Phone Input with +966 Prefix

```html
<nz-form-item>
  <nz-form-label [nzRequired]="form | isRequired: 'phone'"> رقم الجوال </nz-form-label>
  <nz-form-control [nzErrorTip]="nzErrorTip">
    <nz-input-group [nzSuffix]="'+966'">
      <input formControlName="phone" nz-input appPhoneOnly class="text-end" nzSize="large" placeholder="000 000 000" />
    </nz-input-group>
  </nz-form-control>
</nz-form-item>
```

### 3.4. Error Template

Always include at the bottom of the form:

```html
<ng-template #nzErrorTip let-control>
  <app-nz-control-error-temp [control]="control"></app-nz-control-error-temp>
</ng-template>
```

### 3.5. NG-Select (DropDown)

```html
<nz-form-item>
  <nz-form-label [nzRequired]="form | isRequired: 'fieldName'"> {{ 'LABEL' | translate }} </nz-form-label>
  <nz-form-control [nzErrorTip]="nzErrorTip">
    <ng-select formControlName="fieldName" [items]="items" bindLabel="title" bindValue="id" [clearable]="false" [loading]="isLoading" [disabled]="!parentField" placeholder="{{ 'PLACEHOLDER' | translate }}"></ng-select>
  </nz-form-control>
</nz-form-item>
```

### 3.6. Validation Patterns

Use the validators from `app-const.ts` and `core/helpers/`:

```typescript
import { noWhitespaceValidator, wholePositiveNumberValidator, userNamePattern } from 'src/app/app-const';
import { saudiMobileValidator } from 'src/app/core/helpers/mobile.validators';
import { emailWithDomainExtensionValidator } from 'src/app/shared/validators/email-with-domain-extension.validator';

// Text fields with whitespace prevention
userName: new FormControl<string>('', [Validators.required, noWhitespaceValidator]),

// Phone with Saudi format
phone: new FormControl<string>('', [Validators.required, saudiMobileValidator]),

// Email with domain extension check
email: new FormControl<string>('', [Validators.required, emailWithDomainExtensionValidator()]),

// Positive whole numbers (1, 2, 3...)
branchesCount: new FormControl<number | null>(null, [Validators.required, wholePositiveNumberValidator]),
```

Available validators:

| Validator                           | Import                                                       | Purpose                                          |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| `noWhitespaceValidator`             | `app-const.ts`                                               | Rejects strings containing only whitespace       |
| `wholePositiveNumberValidator`      | `app-const.ts`                                               | Only allows whole positive integers (1, 2, 3...) |
| `saudiMobileValidator`              | `core/helpers/mobile.validators.ts`                          | Validates Saudi mobile numbers                   |
| `emailWithDomainExtensionValidator` | `shared/validators/email-with-domain-extension.validator.ts` | Validates email with proper domain extension     |
| `noWhitespaceValidator`             | `app-const.ts`                                               | Rejects whitespace-only values                   |

Error messages are handled by `NzControlErrorTempComponent` which supports all these validators out of the box (see `shared/components/nz-control-error-temp/`).

### 3.7. Tooltip on Field Label

```html
<nz-form-label [nzRequired]="form | isRequired: 'branchesCount'">
  <span nz-tooltip [nzTooltipTitle]="'Tooltip text here'" class="d-inline-flex align-items-center gap-1">
    عدد الفروع
    <i class="bx bx-info-circle text-gray-500 fs-5"></i>
  </span>
</nz-form-label>
```

Requires `NzToolTipModule` import from `ng-zorro-antd/tooltip`.

### 3.8. Disabled Select Until Dependency Fulfilled

```typescript
// In component:
this.form.controls.cityId.valueChanges.subscribe((cityId) => {
  if (!cityId) {
    this.districts = [];
    this.form.controls.districtId.setValue(null);
    this.form.controls.districtId.disable();
    return;
  }
  this.form.controls.districtId.enable();
  this.loadDistricts(cityId);
});
```

### 3.9. Radio Button Group as Cards

```html
<nz-radio-group formControlName="fieldName" class="row row-cols-1 g-3 w-100">
  <div class="col" *ngFor="let item of items">
    <label nz-radio [nzValue]="item.id" class="border rounded-3 cursor-pointer d-flex align-items-center justify-content-between p-3 w-100" [class.bg-outline-primary]="selectedValue === item.id" [class.border-primary]="selectedValue === item.id"> {{ item.name }} </label>
  </div>
</nz-radio-group>
```

---

## 4. 📦 Module Imports

### 4.1. CRITICAL: FormSharedModule

Use `FormSharedModule` instead of importing individual NzForm/Input modules. It bundles:

- `NzFormModule`, `NzInputModule`, `NzButtonModule`, `NzCheckboxModule`, `NzSwitchModule`, `NzDatePickerModule`, `NzTableModule`, `NzImageModule`
- `ReactiveFormsModule`, `FormsModule`
- `TranslateModule`, `NgSelectModule`
- `IsRequiredPipe`, `PasswordInputComponent`, `NzControlErrorTempComponent`
- `NgbPaginationModule`, `NgbAccordionModule`, `NgbNavModule`, `NgbTooltipModule`, `NgbDropdownModule`, `NgbModalModule`
- `NgxDropzoneModule`

```typescript
import { FormSharedModule } from 'src/app/shared/modules/nz-form-full/nz-form-full.module';
```

### 4.2. Module Pattern (non-standalone)

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormSharedModule } from 'src/app/shared/modules/nz-form-full/nz-form-full.module';
import { PhoneOnlyDirective } from 'src/app/shared/directives/phone-only.directive';

@NgModule({
  declarations: [YourComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormSharedModule,
    PhoneOnlyDirective, // standalone directive
    // Additional imports when needed:
    // NzRadioModule, NzInputModule, NgSelectModule
  ],
})
export class YourModule {}
```

### 4.3. Standalone Component Pattern

```typescript
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FormSharedModule,
    PhoneOnlyDirective,
    // etc.
  ]
})
```

---

## 5. 🔄 Common Directives & Pipes

### 5.1. Directives

| Directive       | Usage                  | Notes                                  |
| --------------- | ---------------------- | -------------------------------------- |
| `appPhoneOnly`  | `<input appPhoneOnly>` | Restricts to digits, +, spaces, -, ( ) |
| `appPermission` | RBAC permission check  | From `app-permissions.directive.ts`    |

### 5.2. Pipes

| Pipe         | Usage                         | Notes                                          |
| ------------ | ----------------------------- | ---------------------------------------------- |
| `isRequired` | `form \| isRequired: 'field'` | Checks if form control has Validators.required |
| `translate`  | `'KEY' \| translate`          | ngx-translate i18n                             |

### 5.3. App-wide Constants (`app-const.ts`)

```typescript
import { logo, ShowSWAL, noWhitespaceValidator, userNamePattern, errorCallback, SWAL } from 'src/app/app-const';
```

- `logo.light` / `logo.dark` — Logo paths
- `SWAL(type, message)` — SweetAlert helper
- `errorCallback(error)` — Standard error handler
- `noWhitespaceValidator` — Prevents whitespace-only values

---

## 6. 🔐 Auth Flow & Guards

| Route         | Guard       | Purpose                             |
| ------------- | ----------- | ----------------------------------- |
| `/account/**` | None        | Public auth pages (login, register) |
| `/**` (app)   | `authGuard` | Main app requires auth              |
| `/academy/**` | `authGuard` | Academy registration flow           |

Auth guard: `auth.guard.ts` from `core/guards/auth.guard.ts`

---

## 7. 🗺️ Route Structure

```
/                           → redirect to /dashboard
/account/login              → LoginComponent
/account/register           → RegistrationComponent
/account/forgot-password    → Recoverpwd2Component
/account/verify-email       → VerifyEmailComponent
/academy/register           → RegisterComponent
/academy/verify             → VerifyComponent
/academy/plans              → PlansComponent
/academy/confirm            → ConfirmComponent
/dashboard                  → Dashboard (auth required)
/players                    → Players (auth required)
/subscriptions              → Subscriptions (auth required)
... etc                     → All auth required
```

---

## 8. ⚙️ Environment Variables

| File                                | Purpose            |
| ----------------------------------- | ------------------ |
| `environments/environment.ts`       | Dev API URL        |
| `environments/environment.stage.ts` | Staging API URL    |
| `environments/environment.prod.ts`  | Production API URL |

Firebase config is also in environment files.

---

## 9. 🛠️ Common Errors & Fixes

### `'nz-form' is not a known element`

**Fix**: Import `FormSharedModule` (not just `NzFormModule`).

```typescript
import { FormSharedModule } from 'src/app/shared/modules/nz-form-full/nz-form-full.module';
```

### `'nz-radio-group' is not a known element`

**Fix**: Import `NzRadioModule` from `ng-zorro-antd/radio`.

### `ng-select is not a known element`

**Fix**: Import `NgSelectModule` from `@ng-select/ng-select`.

### `Property 'nzErrorTip' does not exist on type`

**Fix**: This is a false positive. The `#nzErrorTip` template reference is defined in the template at the bottom. Make sure `<ng-template #nzErrorTip>` exists in your template.

### `Can't bind to 'formGroup' since it isn't a known property`

**Fix**: Import `ReactiveFormsModule` (included in `FormSharedModule`).

---

## 10. 📁 Project Structure

```
FrontApp/src/
├── app/
│   ├── account/            # Auth pages (login, register, OTP)
│   ├── core/
│   │   ├── backend/        # AUTO-GENERATED API clients (DO NOT MODIFY)
│   │   │   ├── common/     # Common API services
│   │   │   └── academy/    # Academy API services
│   │   ├── guards/         # Auth + Permission guards
│   │   ├── helpers/        # Utility functions (mobile.validators, etc.)
│   │   └── services/       # Singletons (auth, language, etc.)
│   ├── extrapages/         # 404, maintenance pages
│   ├── layouts/            # App layout (vertical, horizontal)
│   ├── pages/              # Feature modules (lazy-loaded)
│   │   ├── academy/         # Academy registration flow
│   │   ├── dashboard/
│   │   ├── players/
│   │   └── ...
│   └── shared/
│       ├── components/     # Reusable components
│       ├── directives/     # appPhoneOnly, etc.
│       ├── modules/        # FormSharedModule (nz-form-full)
│       ├── pipes/          # isRequired pipe
│       └── validators/     # Custom validators
├── assets/
│   ├── i18n/               # Translation files (ar, en)
│   ├── images/
│   ├── js/
│   └── scss/               # Bootstrap custom theme
├── environments/           # Environment configs
└── main.ts
```

---

## 11. 🚫 DON'Ts

- ❌ **Don't create per-component SCSS files** — use Bootstrap utilities only
- ❌ **Don't modify files in `core/backend/`** — they are auto-generated from OpenAPI
- ❌ **Don't put business logic in controllers** — (backend rule but applies to Angular components too: keep them thin)
- ❌ **Don't import `NzFormModule` directly** — use `FormSharedModule` instead
- ❌ **Don't use `ngStyle` or inline styles** — use utility classes
- ❌ **Don't hardcode strings** — always use translation keys
- ❌ **Don't add logic in templates** — keep template logic to a minimum (use component methods)
