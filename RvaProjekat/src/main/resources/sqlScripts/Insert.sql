insert into status(id, naziv, oznaka)
values (nextval('status_seq'),'Student na budzetu', 'BUDZ'),
(nextval('status_seq'),'Samomfinansirajuci student', 'SMF'),
(nextval('status_seq'),'Uslovno upisan student', 'USL'),
(nextval('status_seq'),'Inostrani student', 'INO'),
(nextval('status_seq'),'Student sa posebnim potrebama', 'SPP'),
(nextval('status_seq'),'Studiranje na daljinu', 'SND');

insert into status(id, naziv, oznaka)
values (-100,'TestNaz', 'TestOznaka');

insert into fakultet(id, naziv, sediste)
values (nextval('fakultet_seq'),'Fakultet tehnickih nauka', 'Novi Sad'),
(nextval('fakultet_seq'),'Ekonomski fakultet', 'Beograd'),
(nextval('fakultet_seq'),'Fakultet organizacionih nauka', 'Beograd'),
(nextval('fakultet_seq'),'Pravni fakultet', 'Novi Sad'),
(nextval('fakultet_seq'),'Medicinski fakultet', 'Novi Sad'),
(nextval('fakultet_seq'),'Filozofski fakultet', 'Nis'),
(nextval('fakultet_seq'),'Fakultet tenickih nauka', 'Kragujevac'),
(nextval('fakultet_seq'),'Prirodno matematicki fakultet', 'Beograd');

insert into fakultet(id, naziv, sediste)
values (-100,'TestNaz', 'TestSed');




insert into departman(id, naziv, oznaka, fakultet)
values (nextval('departman_seq'),'Departman za industrijsko inzenjerstvo i menadzment', 'IIM', 1),
(nextval('departman_seq'),'Departman za energetiku', 'EE', 1),
(nextval('departman_seq'),'Departman za racunovodstvo', 'RA', 2),
(nextval('departman_seq'),'Departman za menadzment', 'MM', 2),
(nextval('departman_seq'),'Departman za arhitekturu i urbanizam', 'AU', 3),
(nextval('departman_seq'),'Departman za krivicno pravo', 'KP', 4),
(nextval('departman_seq'),'Departman za hirurgiju', 'MH', 5),
(nextval('departman_seq'),'Departman za istoriju', 'II', 6),
(nextval('departman_seq'),'Departman za saobracaj', 'SA', 7),
(nextval('departman_seq'),'Departman za matematiku', 'MA', 8);

insert into departman(id, naziv, oznaka, fakultet)
values (-100,'TestNaz', 'TestOzn', 1);


insert into student(id,ime, prezime, broj_indeksa, status, departman)
values (nextval('student_seq'),'Ivana','Gvero','IT47/2019', 1, 1 ),
(nextval('student_seq'),'Ana','Petrovic','IT34/2019', 1, 1 ),
(nextval('student_seq'),'Una','Obradovic','PP56/2020', 2, 2 ),
(nextval('student_seq'),'Marko','Markovic','KK56/2019', 1, 3 ),
(nextval('student_seq'),'Vanja','Zarkovic','IK22/2019', 2, 4 ),
(nextval('student_seq'),'Nikola','Mirkovic','RS51/2021', 3, 5 ),
(nextval('student_seq'),'Vanja','Vojinovic','PI33/2019', 4, 6),
(nextval('student_seq'),'Zeljko','Mitrovic','LT77/2019', 3, 6 ),
(nextval('student_seq'),'Mira','Miric','WE66/2018', 5, 7 ),
(nextval('student_seq'),'Ognjen','Maric','TR47/2019', 6, 8 ),
(nextval('student_seq'),'Ivana','Gvero','LL89/2017', 4, 9 ),
(nextval('student_seq'),'Ivana','Gvero','EE12/2015', 2, 10 );

insert into student(id,ime, prezime, broj_indeksa, status, departman)
values (-100,'TestIme','TestPrezime','TestIndeks', 1, 1 );
