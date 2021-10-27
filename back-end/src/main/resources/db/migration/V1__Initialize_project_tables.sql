create table gpu_board (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    is_working bit,
    model_name varchar(255),
    performance bigint,
    gpu_server_id bigint,
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

create table gpu_server (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    disk_size bigint,
    is_on bit not null,
    last_response datetime,
    memory_size bigint,
    name varchar(255) not null,
    lab_id bigint,
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

create table job (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    expected_time varchar(255) not null,
    started_time datetime,
    ended_time datetime,
    meta_data varchar(255) not null,
    name varchar(255) not null,
    status varchar(255) not null,
    gpu_board_id bigint,
    member_id bigint,
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

create table lab (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    name varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

create table administrator (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    email varchar(255),
    password varchar(255),
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

create table member (
    id bigint not null auto_increment,
    created_at datetime,
    updated_at datetime,
    email varchar(255) not null,
    member_type varchar(255) not null,
    name varchar(255) not null,
    password varchar(255) not null,
    lab_id bigint,
    primary key (id)
) engine=InnoDB default charset=utf8mb4;

alter table gpu_board
    add constraint FKmlaxkpi5wl3aj52p17vp85i3a foreign key (gpu_server_id) references gpu_server (id);
alter table gpu_server
    add constraint FK1rhos9cjtoor5ie1u6ltaveds foreign key (lab_id) references lab (id);
alter table job
    add constraint FKg8a9jo8un6ps9dqlqb7ijxc2d foreign key (gpu_board_id) references gpu_board (id);
alter table job
    add constraint FKdt0g2w772iceic8f57vwd590s foreign key (member_id) references member (id);
alter table member
    add constraint FKbxh2eojsjc94cmeo0fn5uvnwu foreign key (lab_id) references lab (id);

alter table gpu_server
    add constraint UKixn8qpho3d70myk9flqim3ugv unique key (name,lab_id);

alter table lab
    add constraint UK_j9qsyhoxrgtbt56xq53bvggjw unique key (name);

alter table member
    add constraint UK_mbmcqelty0fbrvxp1q58dn57t unique key (email);