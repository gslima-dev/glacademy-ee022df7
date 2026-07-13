
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Seed courses
INSERT INTO public.courses (slug, title, subtitle, description, discipline, level, image_url) VALUES
('fq-11', 'Física e Química A · 11.º ano', 'Mecânica, ondas e química orgânica', 'Curso completo alinhado com o programa oficial. Vídeos curtos, exercícios resolvidos e checklists de estudo para dominares cada módulo com clareza.', 'FQ', '11', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&q=80'),
('fq-12', 'Física e Química A · 12.º ano', 'Preparação intensiva para o exame nacional', 'Sessões focadas nos temas mais cobrados no exame nacional, com estratégias de resolução e simulacros.', 'FQ', '12', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80'),
('biogeo-11', 'Biologia e Geologia · 11.º ano', 'Genética, imunidade e geologia interna', 'Explicações claras, mapas conceptuais e treino sistemático de questões de exame para dominares a matéria.', 'BioGeo', '11', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80');

-- Modules + lessons for FQ 11
WITH c AS (SELECT id FROM public.courses WHERE slug='fq-11'),
m1 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Mecânica', 'Cinemática e dinâmica de translação', 1 FROM c RETURNING id),
m2 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Ondas e eletromagnetismo', 'Fenómenos ondulatórios e circuitos', 2 FROM c RETURNING id),
m3 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Química orgânica', 'Do etano aos plásticos', 3 FROM c RETURNING id)
INSERT INTO public.lessons (module_id, title, slug, description, duration_minutes, position, summary) 
SELECT id, 'Introdução à cinemática', 'intro-cinematica', 'Posição, deslocamento e velocidade média.', 18, 1, 'Diferenças chave entre grandezas escalares e vetoriais.' FROM m1
UNION ALL SELECT id, 'Movimento retilíneo uniformemente variado', 'mruv', 'Equações e gráficos v(t) e x(t).', 24, 2, 'Como identificar MRUV a partir de gráficos.' FROM m1
UNION ALL SELECT id, 'Leis de Newton aplicadas', 'leis-newton', 'Resolução de exercícios com planos inclinados.', 30, 3, 'Diagrama de forças passo a passo.' FROM m1
UNION ALL SELECT id, 'Ondas mecânicas', 'ondas-mecanicas', 'Comprimento de onda, frequência e velocidade.', 22, 1, 'Distinguir ondas transversais de longitudinais.' FROM m2
UNION ALL SELECT id, 'Reflexão e refração', 'reflexao-refracao', 'Lei de Snell e aplicações.', 20, 2, 'Ângulo crítico e reflexão total.' FROM m2
UNION ALL SELECT id, 'Nomenclatura de alcanos', 'nomenclatura-alcanos', 'Regras IUPAC essenciais.', 16, 1, 'Passos para nomear qualquer alcano ramificado.' FROM m3
UNION ALL SELECT id, 'Isomeria', 'isomeria', 'Isomeria de cadeia, posição e função.', 20, 2, 'Como reconhecer isómeros em segundos.' FROM m3;

-- Modules + lessons for FQ 12
WITH c AS (SELECT id FROM public.courses WHERE slug='fq-12'),
m1 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Mecânica da partícula', 'Energia, trabalho e potência', 1 FROM c RETURNING id),
m2 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Campos de forças', 'Gravítico e elétrico', 2 FROM c RETURNING id)
INSERT INTO public.lessons (module_id, title, slug, description, duration_minutes, position, summary)
SELECT id, 'Trabalho de uma força', 'trabalho-forca', 'Definição vetorial e casos especiais.', 25, 1, 'Sinal do trabalho e a sua interpretação física.' FROM m1
UNION ALL SELECT id, 'Teorema da energia cinética', 'tec', 'Aplicações a percursos reais.', 28, 2, 'Resolução guiada de 3 problemas de exame.' FROM m1
UNION ALL SELECT id, 'Campo elétrico', 'campo-eletrico', 'Cargas pontuais e linhas de campo.', 22, 1, 'Como esboçar linhas de campo corretamente.' FROM m2;

-- Modules + lessons for BioGeo 11
WITH c AS (SELECT id FROM public.courses WHERE slug='biogeo-11'),
m1 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Reprodução e genética', 'Meiose, hereditariedade e mutações', 1 FROM c RETURNING id),
m2 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Imunidade', 'Defesas específicas e não específicas', 2 FROM c RETURNING id),
m3 AS (INSERT INTO public.modules (course_id, title, summary, position) SELECT id, 'Geologia interna', 'Tectónica e magmatismo', 3 FROM c RETURNING id)
INSERT INTO public.lessons (module_id, title, slug, description, duration_minutes, position, summary)
SELECT id, 'Meiose passo a passo', 'meiose', 'As duas divisões meióticas explicadas.', 24, 1, 'Diferenças fundamentais entre meiose I e II.' FROM m1
UNION ALL SELECT id, 'Leis de Mendel', 'mendel', 'Monoibridismo e diibridismo com exemplos.', 26, 2, 'Como montar quadros de Punnett rapidamente.' FROM m1
UNION ALL SELECT id, 'Resposta imunitária específica', 'imunidade-especifica', 'Linfócitos B e T na prática.', 22, 1, 'Ativação da imunidade adaptativa passo a passo.' FROM m2
UNION ALL SELECT id, 'Tectónica de placas', 'tectonica', 'Fronteiras e movimentos.', 20, 1, 'Reconhecer o tipo de fronteira num mapa.' FROM m3;
