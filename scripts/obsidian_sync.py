# Uso: npm run obsidian
# Copia o diário para o cofre do Obsidian: uma nota por etapa, imagens em Anexos e as capturas da evolução.
# A nota principal (Nanquim System.md) é escrita à mão e não é tocada por este script.
import os
import re
import shutil
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

VAULT = Path(os.environ.get('OBSIDIAN_VAULT', r'C:\PROJETOS DE PROGRAMAÇÃO\Segundo Cérebro'))
NOTES_DIR = VAULT / '3-Recursos' / 'Meus Projetos' / 'Nanquim System'
ATTACHMENTS_DIR = VAULT / '3-Recursos' / 'Anexos' / 'Nanquim System'
DIARY = Path('diario')
MAIN_NOTE = 'Nanquim System'

IMAGE = re.compile(r'!\[[^\]]*\]\((prints/[^)]+\.png)\)')
FILE_LINK = re.compile(r'\[[^\]]*\]\((prints/[^)]+\.png)\)')
FOLDER_LINK = re.compile(r'\[`?([^`\]]*)`?\]\((prints/[^)]+/)\)')
ENTRY_LINK = re.compile(r'\[([^\]]+)\]\((\d{3}-[^)]+\.md)\)')


def attachment_name(relative_path):
    folder, file = Path(relative_path).parts[-2:]
    return f'nanquim-{folder}-{file}'


def copy_attachment(relative_path):
    name = attachment_name(relative_path)
    shutil.copy2(DIARY / relative_path, ATTACHMENTS_DIR / name)
    return name


def entry_title(path):
    heading = path.read_text(encoding='utf-8').splitlines()[0]
    number, title = re.match(r'# (\d{3}) — (.+)', heading).groups()
    return number, title


def note_name(path):
    number, title = entry_title(path)
    return f'Nanquim {number} - {title}'


def convert(path, names, previous, following):
    lines = path.read_text(encoding='utf-8').splitlines()
    number, title = entry_title(path)
    date = re.search(r'\*\*Data:\*\* (\d{4}-\d{2}-\d{2})', lines[2]).group(1)

    nav = [f'↑ [[{MAIN_NOTE}]]']
    if previous:
        nav.append(f'← [[{names[previous]}]]')
    if following:
        nav.append(f'[[{names[following]}]] →')

    body = []
    for line in lines[1:]:
        in_table = line.lstrip().startswith('|')
        pipe = '\\|' if in_table else '|'

        line = IMAGE.sub(lambda m: f'![[{copy_attachment(m.group(1))}{pipe}{480 if in_table else 900}]]', line)
        line = FILE_LINK.sub(lambda m: f'[[{copy_attachment(m.group(1))}]]', line)
        line = FOLDER_LINK.sub(lambda m: f'`diario/{m.group(2)}` (no repositório)', line)
        line = ENTRY_LINK.sub(lambda m: f'[[{names[m.group(2)]}{pipe}{m.group(1)}]]', line)
        body.append(line)

    frontmatter = [
        '---',
        f'projeto: "[[{MAIN_NOTE}]]"',
        f'etapa: "{number}"',
        f'data: {date}',
        'tags: [projeto]',
        '---',
        '',
        f'# Nanquim {number} — {title}',
        '',
        ' · '.join(nav),
        '',
        f'> Nota gerada de `diario/{path.name}` no repositório. Para mudar, edite lá e rode `npm run obsidian`.',
    ]
    return '\n'.join(frontmatter + body) + '\n'


def copy_evolution():
    evolution = DIARY / 'evolucao'
    for strip in evolution.glob('linha-do-tempo-*.png'):
        shutil.copy2(strip, ATTACHMENTS_DIR / f'nanquim-{strip.name}')
    for version in (p for p in evolution.glob('v*') if p.is_dir()):
        for shot, label in [('01-abertura', 'abertura'), ('04-modo-claro', 'modo-claro')]:
            source = version / f'{shot}.png'
            if source.exists():
                shutil.copy2(source, ATTACHMENTS_DIR / f'nanquim-{version.name}-{label}.png')
    pdf = DIARY / 'Sumi-System-Evolucao.pdf'
    if pdf.exists():
        shutil.copy2(pdf, ATTACHMENTS_DIR / pdf.name)


def main():
    NOTES_DIR.mkdir(parents=True, exist_ok=True)
    ATTACHMENTS_DIR.mkdir(parents=True, exist_ok=True)

    entries = sorted(DIARY.glob('[0-9][0-9][0-9]-*.md'))
    names = {entry.name: note_name(entry) for entry in entries}

    for i, entry in enumerate(entries):
        previous = entries[i - 1].name if i > 0 else None
        following = entries[i + 1].name if i + 1 < len(entries) else None
        note = convert(entry, names, previous, following)
        (NOTES_DIR / f'{names[entry.name]}.md').write_text(note, encoding='utf-8', newline='\n')
        print(f'✓ {names[entry.name]}')

    copy_evolution()
    attachments = len(list(ATTACHMENTS_DIR.iterdir()))
    print(f'\n{len(entries)} notas em {NOTES_DIR}\n{attachments} anexos em {ATTACHMENTS_DIR}')


main()
