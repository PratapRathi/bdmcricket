# Future roadmap

The admin foundation, catalog/content management, stock thresholds, media management, audit log, credentials, and contact inbox are implemented. The remaining items below are future work.

1. **Admin hardening:** add roles/permissions, optional MFA, per-IP login throttling, and an operator recovery workflow before multiple staff accounts are introduced.
2. **Inventory operations:** stock locations, adjustments, reservations, and a dedicated inventory movement history before availability is used for sales.
3. **Offers and campaigns:** date-bounded campaigns, eligibility rules, product/category targeting, and public presentation.
4. **Shopping cart:** focused cart state and server validation of current product/price data.
5. **Checkout and payments:** order persistence, payment provider integration, webhook verification, idempotency, and operational monitoring.
6. **Scale product browsing:** normalized numeric price, cursor pagination, indexed search, and reviewed response caching when catalogue size warrants it.
7. **Contact operations:** notifications, retention/consent policy, and database-backed service or browser-level coverage.

Add each capability with domain services, authorization, migrations, and operator-visible error handling; do not document planned APIs as if they exist.
