#!/usr/bin/python3

from Area import Area
import sys

if __name__ == '__main__':
    if sys.argv[1].endswith('.pdf'):
        Area(sys.argv[1], 3, 30, 500, 530, 275, 'NoteStd').extract()
        Area(sys.argv[1], 4, 30, 108, 530, 180, 'QITotal').extract()
        Area(sys.argv[1], 7, 30, 108, 530, 190, 'IndiceComp').extract()
