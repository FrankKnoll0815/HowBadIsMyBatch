#!/bin/bash
/home/frankknoll/.local/bin/jupyter nbconvert --to notebook --execute /home/frankknoll/Dokumente/Corona/projects/HowBadIsMyBatch-pages/src/intensivstationen/Intensivstationen.ipynb | mail -s "FKK fcrontab" -r Knoll_Frank@web.de Knoll_Frank@web.de