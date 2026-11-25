# Future roadmap

These are planned areas, not implemented features.

1. **Admin access:** authentication, authorization, audit logging, and protected admin route group.
2. **Product management:** create/edit/archive products through validated handlers and shared server services; support ordered images and specifications.
3. **Category management:** manage categories and subcategories without turning public page routing into a database registry.
4. **Inventory:** define stock units, locations, adjustments, reservations, and audit history before exposing availability.
5. **Offers and campaigns:** date-bounded campaigns, eligibility rules, product/category targeting, and page presentation.
6. **Shopping cart:** focused cart state and server validation of current product/price data.
7. **Checkout and payments:** order persistence, payment provider integration, webhook verification, idempotency, and operational monitoring.
8. **Scale product browsing:** normalized numeric price, cursor pagination, indexed search, and reviewed response caching when catalogue size warrants it.
9. **Contact enquiry:** add a form, validation, spam protection, persistence/delivery policy, and a real handler only after requirements are defined.

Add each capability with domain services, authorization, migrations, and operator-visible error handling; do not document planned APIs as if they exist.
