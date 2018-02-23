import os

class Area:

    def __init__(self, filename, page, x, y, length, width, name, dpiFact=4):
        self._filename = filename
        self._page = page - 1
        self._coordinates = (x, y)
        self._size = (length, width)
        self._name = name
        self._dpiFact = dpiFact

    def getDirectory(self):
        return os.path.basename(os.path.dirname(self._filename))

    def extract(self):
        errorCode = os.system('convert -quality 100 -density {} {}[{}] -crop {}x{}+{}+{} {}.png'.format(
            self._dpiFact * 72,
            self._filename, self._page,
            self._size[0] * self._dpiFact, self._size[1] * self._dpiFact,
            self._coordinates[0] * self._dpiFact, self._coordinates[1] * self._dpiFact,
            os.path.dirname(self._filename) + os.sep + self._name + '_' + self.getDirectory()
        ))
        if errorCode == 0:
            os.system('/usr/bin/notify-send "Extract Data" "Extraction de {}.png"'.format(self._name + '_' + self.getDirectory()))
        else:
            os.system('/usr/bin/notify-send -i /usr/share/icons/mate/32x32/status/dialog-warning.png -u CRITICAL "Extract Data" "Erreur de traitement de  {}.png"'.format(self._name + '_' + self.getDirectory()))
