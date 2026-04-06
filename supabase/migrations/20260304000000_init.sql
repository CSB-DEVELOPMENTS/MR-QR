-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------
-- FUNCTION: update updated_at
--------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--------------------------------------------------
-- 1. subscription_plan
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscription_plan (
    subscription_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    limits jsonb NOT NULL DEFAULT '{}'::jsonb,
    permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
    billing_period_months int NOT NULL,
    price numeric(12,2) NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscription_plan_subscription_id ON public.subscription_plan(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_plan_name ON public.subscription_plan(name);

DROP TRIGGER IF EXISTS trg_subscription_plan_updated_at ON public.subscription_plan;
CREATE TRIGGER trg_subscription_plan_updated_at
BEFORE UPDATE ON public.subscription_plan
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 2. user
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    first_name text,
    last_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_subscription_id ON public.users(user_id);

DROP TRIGGER IF EXISTS trg_user_updated_at ON public.users;
CREATE TRIGGER trg_user_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 3. landing_page
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.landing_page (
    landingpage_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    logo_path text,
    description text,
    business_name text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_landing_page_user_id ON public.landing_page(user_id);

DROP TRIGGER IF EXISTS trg_landing_page_updated_at ON public.landing_page;
CREATE TRIGGER trg_landing_page_updated_at
BEFORE UPDATE ON public.landing_page
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 4. link
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.link (
    link_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    landingpage_id uuid NOT NULL REFERENCES public.landing_page(landingpage_id) ON DELETE CASCADE,
    link text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_link_landingpage_id ON public.link(landingpage_id);

DROP TRIGGER IF EXISTS trg_link_updated_at ON public.link;
CREATE TRIGGER trg_link_updated_at
BEFORE UPDATE ON public.link
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 5. qr
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.qr (
    qr_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    url text NOT NULL,
    image_url text,
    styles jsonb DEFAULT '{}'::jsonb,
    type text,
    total_clicks int DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qr_user_id ON public.qr(user_id);

DROP TRIGGER IF EXISTS trg_qr_updated_at ON public.qr;
CREATE TRIGGER trg_qr_updated_at
BEFORE UPDATE ON public.qr
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 6. qr_clicks
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.qr_clicks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    qr_id uuid NOT NULL REFERENCES public.qr(qr_id) ON DELETE CASCADE,
    device text,
    country text,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qr_clicks_qr_id ON public.qr_clicks(qr_id);

--------------------------------------------------
-- 7. shorten_url
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shorten_url (
    shorten_url_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    url text NOT NULL,
    short_url text UNIQUE NOT NULL,
    total_clicks int DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_shorten_url_user_id ON public.shorten_url(user_id);

DROP TRIGGER IF EXISTS trg_shorten_url_updated_at ON public.shorten_url;
CREATE TRIGGER trg_shorten_url_updated_at
BEFORE UPDATE ON public.shorten_url
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 8. vcard
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vcard (
    vcard_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    job_title text,
    company text,
    contact text,
    email text,
    web_url text,
    social jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vcard_user_id ON public.vcard(user_id);

DROP TRIGGER IF EXISTS trg_vcard_updated_at ON public.vcard;
CREATE TRIGGER trg_vcard_updated_at
BEFORE UPDATE ON public.vcard
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 9. usage_tracking
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.usage_tracking (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    action_type text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_action_type ON public.usage_tracking(action_type);

--------------------------------------------------
-- 10. user_subscription
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_subscription (
    user_subscription_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    subscription_plan_id uuid NOT NULL REFERENCES public.subscription_plan(subscription_id),
    current_period_start timestamptz,
    current_period_end timestamptz,
    next_billing_date timestamptz,
    is_active text NOT NULL DEFAULT 'active' CHECK (is_active IN ('active', 'past_due', 'canceled')),
    gateway_subscription_id text,
    cancel_at_period_end boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_subscription_user_id ON public.user_subscription(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscription_plan_id ON public.user_subscription(subscription_plan_id);
CREATE INDEX IF NOT EXISTS idx_user_subscription_is_active ON public.user_subscription(is_active);

DROP TRIGGER IF EXISTS trg_user_subscription_updated_at ON public.user_subscription;
CREATE TRIGGER trg_user_subscription_updated_at
BEFORE UPDATE ON public.user_subscription
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--------------------------------------------------
-- 11. payments
--------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    payment_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_subscription_id uuid NOT NULL REFERENCES public.user_subscription(user_subscription_id) ON DELETE CASCADE,
    order_id text,
    gateway_payment_id text UNIQUE,
    amount numeric(12,2) NOT NULL,
    currency text NOT NULL DEFAULT 'LKR',
    gateway_response jsonb,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_subscription_id ON public.payments(user_subscription_id);

--------------------------------------------------
-- 12. row level security (RLS)
--------------------------------------------------
ALTER TABLE IF EXISTS public.subscription_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.landing_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.link ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.qr ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.qr_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shorten_url ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vcard ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_subscription ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payments ENABLE ROW LEVEL SECURITY;

--------------------------------------------------
-- 12.1 subscription_plan policies
--------------------------------------------------
DROP POLICY IF EXISTS subscription_plan_read_all ON public.subscription_plan;
CREATE POLICY subscription_plan_read_all
ON public.subscription_plan
FOR SELECT
TO authenticated, anon
USING (true);

--------------------------------------------------
-- 12.2 users policies
--------------------------------------------------
DROP POLICY IF EXISTS users_owner_select ON public.users;
DROP POLICY IF EXISTS users_owner_insert ON public.users;
DROP POLICY IF EXISTS users_owner_update ON public.users;
DROP POLICY IF EXISTS users_owner_delete ON public.users;

CREATE POLICY users_owner_select
ON public.users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY users_owner_insert
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY users_owner_update
ON public.users
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

--------------------------------------------------
-- 12.3 landing_page policies
--------------------------------------------------
DROP POLICY IF EXISTS landing_page_owner_all ON public.landing_page;
DROP POLICY IF EXISTS landing_page_owner_select ON public.landing_page;
DROP POLICY IF EXISTS landing_page_owner_insert ON public.landing_page;
DROP POLICY IF EXISTS landing_page_owner_update ON public.landing_page;
DROP POLICY IF EXISTS landing_page_owner_delete ON public.landing_page;

CREATE POLICY landing_page_owner_select
ON public.landing_page
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY landing_page_owner_insert
ON public.landing_page
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY landing_page_owner_update
ON public.landing_page
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY landing_page_owner_delete
ON public.landing_page
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.4 link policies
--------------------------------------------------
DROP POLICY IF EXISTS link_owner_all ON public.link;
DROP POLICY IF EXISTS link_owner_select ON public.link;
DROP POLICY IF EXISTS link_owner_insert ON public.link;
DROP POLICY IF EXISTS link_owner_update ON public.link;
DROP POLICY IF EXISTS link_owner_delete ON public.link;

CREATE POLICY link_owner_select
ON public.link
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.landing_page lp
        WHERE lp.landingpage_id = link.landingpage_id
            AND lp.user_id = auth.uid()
    )
);

CREATE POLICY link_owner_insert
ON public.link
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.landing_page lp
        WHERE lp.landingpage_id = link.landingpage_id
            AND lp.user_id = auth.uid()
    )
);

CREATE POLICY link_owner_update
ON public.link
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.landing_page lp
        WHERE lp.landingpage_id = link.landingpage_id
            AND lp.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.landing_page lp
        WHERE lp.landingpage_id = link.landingpage_id
            AND lp.user_id = auth.uid()
    )
);

CREATE POLICY link_owner_delete
ON public.link
FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.landing_page lp
        WHERE lp.landingpage_id = link.landingpage_id
            AND lp.user_id = auth.uid()
    )
);

--------------------------------------------------
-- 12.5 qr policies
--------------------------------------------------
DROP POLICY IF EXISTS qr_owner_select ON public.qr;
DROP POLICY IF EXISTS qr_owner_insert ON public.qr;
DROP POLICY IF EXISTS qr_owner_update ON public.qr;
DROP POLICY IF EXISTS qr_owner_delete ON public.qr;

CREATE POLICY qr_owner_select
ON public.qr
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY qr_owner_insert
ON public.qr
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY qr_owner_update
ON public.qr
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY qr_owner_delete
ON public.qr
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.6 qr_clicks policies
--------------------------------------------------
DROP POLICY IF EXISTS qr_clicks_owner_read_update_delete ON public.qr_clicks;
DROP POLICY IF EXISTS qr_clicks_owner_select ON public.qr_clicks;
CREATE POLICY qr_clicks_owner_select
ON public.qr_clicks
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.qr
        WHERE qr.qr_id = qr_clicks.qr_id
            AND qr.user_id = auth.uid()
    )
);

--------------------------------------------------
-- 12.7 shorten_url policies
--------------------------------------------------
DROP POLICY IF EXISTS shorten_url_owner_select ON public.shorten_url;
DROP POLICY IF EXISTS shorten_url_owner_insert ON public.shorten_url;
DROP POLICY IF EXISTS shorten_url_owner_update ON public.shorten_url;
DROP POLICY IF EXISTS shorten_url_owner_delete ON public.shorten_url;

CREATE POLICY shorten_url_owner_select
ON public.shorten_url
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY shorten_url_owner_insert
ON public.shorten_url
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY shorten_url_owner_update
ON public.shorten_url
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY shorten_url_owner_delete
ON public.shorten_url
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.8 vcard policies
--------------------------------------------------
DROP POLICY IF EXISTS vcard_owner_select ON public.vcard;
DROP POLICY IF EXISTS vcard_owner_insert ON public.vcard;
DROP POLICY IF EXISTS vcard_owner_update ON public.vcard;
DROP POLICY IF EXISTS vcard_owner_delete ON public.vcard;

CREATE POLICY vcard_owner_select
ON public.vcard
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY vcard_owner_insert
ON public.vcard
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY vcard_owner_update
ON public.vcard
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY vcard_owner_delete
ON public.vcard
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.9 usage_tracking policies
--------------------------------------------------
DROP POLICY IF EXISTS usage_tracking_owner_select ON public.usage_tracking;
CREATE POLICY usage_tracking_owner_select
ON public.usage_tracking
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.10 user_subscription policies
--------------------------------------------------
DROP POLICY IF EXISTS user_subscription_owner_select ON public.user_subscription;
CREATE POLICY user_subscription_owner_select
ON public.user_subscription
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

--------------------------------------------------
-- 12.11 payments policies
--------------------------------------------------
DROP POLICY IF EXISTS payments_owner_select ON public.payments;
CREATE POLICY payments_owner_select
ON public.payments
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.user_subscription us
        WHERE us.user_subscription_id = payments.user_subscription_id
            AND us.user_id = auth.uid()
    )
);