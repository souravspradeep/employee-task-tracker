--
-- PostgreSQL database dump
--

\restrict CdimpQiLHLpWvOajATMmnSeeC0Sfh75OhaXZ1b1DG8CiozbLMueCEsk3udORyyF

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    user_id integer,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    department character varying(50),
    "position" character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'pending'::character varying,
    priority character varying(20) DEFAULT 'medium'::character varying,
    employee_id integer,
    assigned_by integer,
    due_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, user_id, name, email, department, "position", created_at) FROM stdin;
1	2	Rajesh	raj008@gmail.com	Hr	Manager	2025-11-28 04:27:18.264203
2	3	Priya	priya04@gmail.com	Sde	Jr Developer	2025-11-28 04:35:08.780756
3	4	System Administrator	admin@gmail.com	Administration	Admin	2025-11-28 05:36:29.072924
4	5	Alex jones	alex@gmail.com	Design	Employee	2025-11-28 06:02:53.964194
5	6	Bob smith	bob@gmail.com	QA	Manager	2025-11-28 06:03:48.167361
6	7	Sourav S Pradeep	sourav.spradeep@gmail.com	Cyber	Manager	2025-11-28 06:15:22.98903
7	8	Ram Kumar	ram@gmail.com	Sde	Manager	2025-11-28 10:35:15.041396
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, status, priority, employee_id, assigned_by, due_date, created_at, updated_at) FROM stdin;
3	Interviews	Onboard new hire.	pending	high	1	4	2025-12-06	2025-11-28 07:03:24.556151	2025-11-28 07:03:24.556151
4	Design landing page	Finalize hero section.	in_progress	medium	4	4	2025-11-30	2025-11-28 07:04:37.846888	2025-11-28 07:04:37.846888
2	System Security	Updating system antiviruse.	completed	high	6	4	2025-12-02	2025-11-28 07:01:50.66998	2025-11-28 07:04:44.326506
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, created_at) FROM stdin;
2	raj008@gmail.com	$2a$10$If6FTtu5Q/O2ADV1qARajOalIWVUJWSM6ucXg3W6lBVtgsA8ueyy6	user	2025-11-28 04:27:18.262106
3	priya04@gmail.com	$2a$10$Q6n0M/zFLaKNaVV/ZQnnAe9i6MERy6eCjiKNT79nJqGLYekByZR.m	user	2025-11-28 04:35:08.779063
4	admin@gmail.com	$2a$10$y847ks075Hurh4dnxAzmL.ZdAJhjTE8oP9Bfu41CcU0gQG1zwGnny	admin	2025-11-28 05:36:29.069239
5	alex@gmail.com	$2a$10$7rs2XSfya/K0PLP9F6TrtODt51UfImt1Fjy.uO0EUa7CWeFCk7oVm	user	2025-11-28 06:02:53.962223
6	bob@gmail.com	$2a$10$mA.eB7oPnjVDHzrfFGru/O/CmwGJgRWC5AYXxLzLn6agNgX8uuJeG	user	2025-11-28 06:03:48.16545
7	sourav.spradeep@gmail.com	$2a$10$m12NqP6ijA.mBI2ceLKOIuPEs39Vd2t4dvXUquVtp0rDHqbrclcWm	user	2025-11-28 06:15:22.98903
8	ram@gmail.com	$2a$10$h3vIJ6OKSGCBKwa8Zt.nte5//BqK0mb1jvDc48VHCBCErNVZJi7wK	user	2025-11-28 10:35:15.039467
\.


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 7, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES public.users(id);


--
-- Name: tasks tasks_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict CdimpQiLHLpWvOajATMmnSeeC0Sfh75OhaXZ1b1DG8CiozbLMueCEsk3udORyyF

