CREATE extension IF NOT EXISTS "uuid-ossp";
ALTER DATABASE postgres SET timezone TO 'Asia/Tashkent';
CREATE DATABASE task_management;


CREATE TYPE enum_role as enum('ADMIN', 'MANAGER', 'STAFF');
CREATE TYPE enum_status as enum('CREATED', 'IN_PROCESS', 'DONE');


CREATE TABLE users (
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(32) NOT NULL,
	role enum_role NOT NULL,
	created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE organizations (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE organization_user (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE projects (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,        
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    worker_user_id UUID REFERENCES users(id) ON DELETE SET NULL, 
    status enum_status NOT NULL DEFAULT 'CREATED',
    due_date TIMESTAMPTZ,                                    
    done_at TIMESTAMPTZ,                                   
    created_at TIMESTAMPTZ DEFAULT NOW()
);
