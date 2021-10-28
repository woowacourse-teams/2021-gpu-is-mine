alter table job
    add expected_started_time   datetime not null default now(),
    add expected_completed_time datetime;
